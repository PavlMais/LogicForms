import Rete from "rete";
import { NodeTypes } from '@/config';
import NodeTemplate from './node_template.vue';

export default class TextQuestionNode extends Rete.Component {

    constructor() {
        super("Start node");
        this.data.component = NodeTemplate;
    }

    builder(node) {
        node.data.type = NodeTypes.START_NODE;
        node.addInput(new Rete.Input('num2', 'test', node.data.m_socket));
    }
}