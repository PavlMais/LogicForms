import Rete from "rete";
import { NodeTypes } from '../../config';
import NodeTemplate from './node_template.vue';
import TextControl from '../controls/TextControl.js'


export default class InfoBlockNode extends Rete.Component {

    constructor() {
        super("Info block");
        this.data.component = NodeTemplate;
        this.type = NodeTypes.INFO_BLOCK;
    }

    builder(node) {
        node.data.type = this.type;

        node.addOutput(new Rete.Output('num', 'Next question', node.data.m_socket));
        node.addInput(new Rete.Input('num2', 'test', node.data.m_socket, true));
        node.addControl(new TextControl(this.editor, 'key', false))
    }
}