import Rete from "rete";
import { NodeTypes } from '@/config';

import TextVue from './text_node.vue';

export default class TextNode extends Rete.Component {

    constructor() {
        super("Text");
        this.data.component = TextVue;
    }

    builder(node) {
        node.data.type = NodeTypes.TEXT;

        node.addOutput(new Rete.Output('num', 'Next question', node.data.m_socket));
        node.addInput(new Rete.Input('num2', 'test', node.data.m_socket));

        //node.addControl(new SelectControl('ke', false));
    }

    worker(node, inputs, outputs) {
    }
}