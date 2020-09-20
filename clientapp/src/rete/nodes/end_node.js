import Rete from "rete";
import { NodeTypes } from '@/config.js';
import NodeTemplate from './node_template.vue';


export default class EndNode extends Rete.Component {

    constructor() {
        super("End node");
        this.data.component = NodeTemplate;
    }

    builder(node) {
        node.data.type = NodeTypes.END_NODE;
        node.addInput(new Rete.Input('num2', 'test', node.data.m_socket));
    }
}