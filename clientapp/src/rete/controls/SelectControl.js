import Rete from "rete";

var VueSelectControl = {
    props: ['readonly', 'ikey', 'getData', 'putData', 'items', 'emitter'],
    template: `
        <select class="custom-select custom-select-sm" @change="change" id="inputGroupSelect01" :value="value" :readonly="readonly">
                <option  v-for="(item, index) in items" :value="item" :key="index">{{item}}</option>
                
       </select>
            `,
    data() {
        return {
            value: ''
        }
    },
    methods: {
        change(e) {
            this.value = e.target.value;
            this.update();
        },
        update() {
            if (this.ikey)
                this.putData(this.ikey, this.value)
            this.emitter.trigger('process');
        }
    },
    mounted() {
        this.value = this.getData(this.ikey) || this.items[0];
    }
}

export default class SelectControl extends Rete.Control {

    constructor(emitter, key, readonly, items) {
        super(key);
        this.data.render = 'vue';
        this.component = VueSelectControl;
        this.props = {emitter, ikey: key, readonly, items};
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}
