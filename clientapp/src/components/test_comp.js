import Rete from "rete";

var VueNumControl = {
    props: ['readonly', 'ikey', 'getData', 'putData'],
    template: '<input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" />',
    data() {
    return {
        value: 0,
    }
    },
    methods: {
    change(e){
        this.value = +e.target.value;
        this.update();
    },
    update() {
        if (this.ikey)
        this.putData(this.ikey, this.value)
        //this.emitter.trigger('process');
    }
    },
    mounted() {
    this.value = this.getData(this.ikey);
    }
}

export default class TControl extends Rete.Control {

    constructor(key, readonly) {
        super(key);
        this.data.render = 'vue';
        this.component = VueNumControl;
        this.props = {ikey: key, readonly };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}
