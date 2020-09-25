import Rete from "rete";
import { NodeTypes } from '../../config';
import NodeTemplate from './node_template.vue';

export default class TextQuestionNode extends Rete.Component {

    constructor() {
        super("Start node");
        this.data.component = NodeTemplate;
        this.type = NodeTypes.START;
    }

    builder(node) {
        node.data.type = this.type;
        node.addOutput(new Rete.Output('num', 'Next question', node.data.m_socket));

    }
}