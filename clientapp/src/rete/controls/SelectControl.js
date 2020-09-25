import Rete from "rete";
import SelectVue from '../../common/select.vue'

var VueSelectControl = {
    props: ['readonly', 'ikey', 'getData', 'putData', 'items', 'emitter'],
    components: { SelectVue },
    template: `
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Type</label>
            </div>

            <SelectVue :items="items" v-model="selected" @change="change"></SelectVue>
        </div>

            `,
    data() {
        return {
            value: '',
            selected: ''
        }
    },
    methods: {
        change(value) {
            this.value = value;
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
