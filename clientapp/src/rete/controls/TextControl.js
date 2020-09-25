import Rete from "rete";

var VueTextControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: `
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" :readonly="readonly" placeholder="Question" :value="value" @input="change($event)" @dblclick.stop="">
            </div>
            `,
    data() {
        return {
            value: "",
        }
    },
    methods: {
        change(e) {
            this.value = e.target.value;
            this.update();
        },
        update() {
            //if (this.ikey)
            //    this.putData(this.ikey, this.value)
            this.putData('title', this.value)
            this.emitter.trigger('process');
        }
    },
    mounted() {
        this.value = this.getData(this.ikey);
    }
}

export default class TextControl extends Rete.Control {

    
    constructor(emitter, key, readonly) {
        super(key);
        this.data.render = 'vue';
        this.component = VueTextControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}

