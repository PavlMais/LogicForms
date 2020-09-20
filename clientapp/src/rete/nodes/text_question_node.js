import Rete from "rete";
import { NodeTypes } from '@/config';
import NodeTemplate from './node_template.vue';
import TextControl from '../controls/TextControl.js'
import SelectControl from '../controls/SelectControl.js'


export default class TextQuestionNode extends Rete.Component {

    constructor() {
        super("Text question");
        this.data.component = NodeTemplate;
    }

    builder(node) {
        node.data.type = NodeTypes.QUESTION_CHOISE;
        node.addOutput(new Rete.Output('num', 'Next question', node.data.m_socket));
        node.addInput(new Rete.Input('num2', 'test', node.data.m_socket));
        node.addControl(new TextControl(this.editor, 'key', false))
        node.addControl(new SelectControl(this.editor, 'fd', false, ['Text', 'Number']))
    }
}