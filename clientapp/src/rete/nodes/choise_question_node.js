import Rete from "rete";
import { NodeTypes } from '@/config';
import NodeTemplate from './node_template.vue';
import TextControl from '../controls/TextControl.js'
import ListControl from '../controls/SelectControl.js'

export default class ChoiseQuestionNode extends Rete.Component {

    constructor() {
        super("Choise question");
        this.data.component = NodeTemplate;
    }
    onChoiseAdded(node, new_item) {
        new_item.output = new Rete.Output(new_item.id, 'output', node.data.m_socket)
        node.addOutput(new_item.output)
        node.choise_items.push(new_item)
        node.update();
    }
    onChoiseRemoved(node, del_item_id) {
        var item = node.choise_items.find(x => x.id === del_item_id);
        node.removeOutput(item.output);
        node.choise_items.splice(node.choise_items.indexOf(item), 1);
        node.update();
    }

    builder(node) {
        node.data.type = NodeTypes.QUESTION_CHOISE;
        node.addOutput(new Rete.Output('num', 'Next question', node.data.m_socket));
        node.addInput(new Rete.Input('num2', 'test', node.data.m_socket));

        node.addControl(new TextControl(this.editor, 'kedfsy', false))
        node.addControl(new ListControl(this.editor, 'key', false, this.onChoiseAdded, this.onChoiseRemoved, node))
    }

    worker(node, inputs, outputs) { }
}