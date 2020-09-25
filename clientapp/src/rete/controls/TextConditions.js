import Rete from "rete";
import SelectVue from '../../common/select.vue'
import { BitwiseOp, StrConditions, NumCondition} from '../../config.js'

var VueSubCondition = {
    props: ["condition", 'for_type'],
    components: { SelectVue },

    template: `
    <div>
        <div class="input-group input-group-sm">

            <SelectVue :items="select_items" :value="condition.type_cond" @changed="condition_changed"></SelectVue>
            <div class="input-group-append">
                <button class="btn btn-light" @click="remove" type="button">Del</button>
            </div>
        </div>
        <div class="input-group input-group-sm">
                <input v-if="is_range"  :value="condition.from"  type="for_type" class="form-control" style="width:0px;" placeholder="From">            
                <input v-if="is_range"  :value="condition.to"    type="for_type" class="form-control" style="width:0px;" placeholder="To">            
                <input v-if="!is_range" :value="condition.value" type="for_type" class="form-control" style="width:0px;" :placeholder="placeholder">            
        </div>
    </div>
            `,
    data() {
        let placeholder = null;
        

        return {
            is_range: this.condition.type_cond == NumCondition.BETWEEN,
            select_items: null,
            placeholder
        }
    },
    methods: {
        condition_changed(type) {
            this.is_range = type === NumCondition.BETWEEN
        },
        remove() {
            this.$emit('remove', this.condition)
        }
    },
    watch: {
        for_type: {
            immediate: true, 

            handler(new_type) {
                switch (new_type) {
                    case 'number':
                        this.placeholder = 'Number'
                        this.select_items = NumCondition
                        break;

                    case 'string':
                        this.placeholder = 'String'
                        this.select_items = StrConditions
                        break;

                    default:
                }
            }
        }
    }
}


var VueNumCondition = {
    props: ["condition", 'for_type'],
    components: { VueSubCondition, SelectVue},
    template: `
        <div class="border p-1 rounded">
            <div v-for="(item, index) of conditions" :key="index">
                <SelectVue v-if="item.type == 'bitwise'" :items="select_items" :value="item.value" btn="X"></SelectVue>

                <VueSubCondition v-else :condition="item" @remove="remove_condition" :id="index" :for_type="for_type"></VueSubCondition>
            </div>
            <button type="button" @click="add_bitwise_operator" class="btn btn-outline-light btn-block btn-sm">Add and/or</button>

        </div>
    `,
    data() {
        return {
            conditions: [
                {
                    type: 'condition',
                    type_cond: NumCondition.EQUAL,
                    value: null,
                },
                
            ],
            select_items: BitwiseOp,
        }
    },
    methods: {
        add_bitwise_operator() {
            this.conditions.push({
                type: 'bitwise',
                value: BitwiseOp.AND
            })
            this.conditions.push({
                type: 'condition',
                type_cond: NumCondition.EQUAL,
                value: null
            })
        },
        remove_condition(condition) {
            console.log('press')
            console.log(condition)

            let index = this.conditions.indexOf(condition)

            this.conditions.splice(index, 1);
            this.conditions.splice(index - 1, 1);

            if (this.conditions.length == 0) {
                this.$emit('remove')
            }
        }
        
    }
}

var VueTextCondition = {
    props: ["condition"],
    template: `
        <div class="border p-1">
            <div class="input-group input-group-sm ">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="checkbox" v-model="condition.title" aria-label="Checkbox for following text input">Not</input>
                    </div>
                </div>

                    <select class="custom-select custom-select-sm">
                        <option value="queal">Equal to</option>
                        <option value="value">Include</option>
                        <option value="value">Exclude</option>
                        <option value="value">More</option>
                    </select>
            </div>

            <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="String" aria-label="Small" aria-describedby="inputGroup-sizing-sm">            
            </div>
            <button type="button" @click="add_bitwise_operator" class="btn btn-outline-light btn-block btn-sm">Add and/or</button>

        </div>
    `,
    data() {
        return {
            bitwise_operators: []
        }
    },
    methods: {
        add_bitwise_operator() {
            this.bitwise_operators.push({})
        },
        
    }
}



var VueTCControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'for_type'],
    template: `

        <div>
            <div v-if="for_type == 'string'">
                <VueTextCondition v-for="(condition, index) in conditions" :key="index" :condition="condition"></VueTextCondition>
            </div>
            <div v-else-if="for_type == 'num'">
                <VueNumCondition :for_type="for_type" v-for="(condition, index) in conditions" :key="index" @remove="remove_cond" :condition="condition"></VueNumCondition>
            </div>
            
            <button type="button" @click="add_condition" class="btn btn-outline-light btn-block btn-sm">Add condition</button>
        </div>

            `,
    components: {
        VueTextCondition,
        VueNumCondition
    },
    data() {
        return {
            value: "",
            conditions: []
        }
    },
    methods: {
        add_condition() {
            console.log(this.for_type)
            this.conditions.push({})
            this.$emit('condition_added')
        },
        remove_cond(condition) {
            this.conditions.remove(condition);
        },
        change(e) {
            this.value = e.target.value;
            this.update();
        },
        update() {
            this.putData('title', this.value)
            this.emitter.trigger('process');
        }
    },
    mounted() {
        this.value = this.getData(this.ikey);
    }
}

export default class TextConditionsControl extends Rete.Control {


    constructor(emitter, key, readonly, for_type) {
        super(key);
        this.data.render = 'vue';
        this.component = VueTCControl;
        this.props = { emitter, ikey: key, readonly, for_type };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}

