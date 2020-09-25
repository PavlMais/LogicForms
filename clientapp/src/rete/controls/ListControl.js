import Rete from "rete";
import ModifyList from '../../components/modif_list.vue'


var VueListControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'onItemAdded', 'onItemRemoved', 'node'],
    components: {
        ModifyList
    },
    template: `<ModifyList @itemAdded="itemAdded" @itemRemoved="itemRemoved"></ModifyList>`,
    data() {
        return {
            items: [],
        }
    },
    itemAdd: null,
    methods: {
        update() {
            if (this.ikey)
                this.putData(this.ikey, this.items)
            this.emitter.trigger('process');
        },

        itemAdded(new_item) {
            this.items.push(new_item);
            this.update();
            this.onItemAdded(this.node, new_item)

         
        },
        itemRemoved(del_item_id) {
            var item = this.items.find(x => x.id === del_item_id);
            this.items.splice(this.items.indexOf(item), 1);
            this.update();
            this.onItemRemoved(this.node, del_item_id)

        }
    },
    mounted() {
        this.items = this.getData(this.ikey) || [];
    }
}

export default class ListControl extends Rete.Control {
    constructor(emitter, key, readonly, onItemAdded, onItemRemoved, node) {
        super(key);
        this.data.render = 'vue';
        this.component = VueListControl;
        node.data.choise_items = []
        this.props = { emitter, ikey: key, readonly, onItemAdded, onItemRemoved, 'node': node };
    }

   

    setValue(val) {
        this.vueContext.items = val;
    }
}