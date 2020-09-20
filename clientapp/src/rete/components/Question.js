import Rete from "rete";

import VueQuestion from './Question.vue';
import SelectControl from '../controls/SelectControl.js';

export default class QuestionComponent extends Rete.Component {

    constructor() {
        super("Question");
        this.data.component = VueQuestion;
    }

    builder(node) {
        //node.addOutput(new Rete.Output('num', 'Next question', node.data.d_socket));
        //node.addInput(new Rete.Input('num2', 'test', node.data.d_socket));

        node.addControl(new SelectControl('ke', false));
    }

    worker(node, inputs, outputs) {
        //console.log('working');
        //outputs['num'] = node.data.num;
    }
}