<template>
    <div class="container">
        <div class="dock-components bg-dark">
            <div class="btn-group-vertical mt-5 w-100">
               
                <button type="button" @click="add_node(NodeTypes.INFO_BLOCK)" class="btn btn-outline-light">Info block</button>
                <button type="button" @click="add_node(NodeTypes.QUESTION_TEXT)" class="btn btn-outline-light">Text</button>
                <button type="button" @click="add_node(NodeTypes.QUESTION_CHOISE)" class="btn btn-outline-light">Choise</button>
            </div>

            <div class="btn-group-vertical mt-5 w-100">

                <button type="button" @click="create_form" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-outline-light">Create form</button>
                <button type="button" @click="add_node('num')" class="btn btn-outline-light">Save draft</button>

            </div>
        </div>

        <div class="editor" id="rete" ref="rete">
            <div class="container">
                <div class="node-editor"></div>
            </div>
        </div>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Form name:</label>
                                <input type="text" v-model="title" placeholder="Form name" class="form-control" id="recipient-name">
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Url:</label>
                                <input type="text" class="form-control" id="recipient-name">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" @click="save_form" class="btn btn-primary">Save form</button>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>

<script>
    import Rete from "rete"
    import ConnectionPlugin from 'rete-connection-plugin'
    import VueRenderPlugin from 'rete-vue-render-plugin'
    import { api } from '../plugins/axios.js'
    import { NodeTypes } from '../config'

    import StartNode from '../rete/nodes/start_node.js'
    import ChoiseQuestionNode from '../rete/nodes/choise_question_node.js'
    import EndNode from "../rete/nodes/end_node"
    import InfoBlockNode from '../rete/nodes/infoblock_node.js'
    import TextQuestionNode from '../rete/nodes/text_question_node.js'

    export default {
        components: {},
        data() {
            return {
                title: "",
                data: null,
                editor: null,
                m_socket: new Rete.Socket('String value'),
                NodeTypes,
                node_builders: []
            }
        },
        
        methods: {

            async add_node(node_type) {
                let node_builder = this.node_builders.find(n => n.type == node_type)
                if (node_builder == undefined) console.error('Type node ' + node_type + ' is not exist!')

               
                let node = await node_builder.createNode({ m_socket: this.m_socket })
                this.editor.addNode(node)
            },
            create_form() {
                var data = [];

                var editor_data = this.editor.toJSON();
                var nodes = Array.from(Object.values(editor_data.nodes));

                nodes.forEach((node) => {
                    console.log(node)
                    var item = {
                        id: node.id,
                        type: node.data.type,
                        position: node.position,
                        title: node.data.title
                    };
                    switch (node.data.type) {
                        case NodeTypes.START:
                        case NodeTypes.INFO_BLOCK:
                        case NodeTypes.QUESTION_TEXT:
                            item.next_id = node.outputs.num.connections[0].node;
                            break;
                        case NodeTypes.QUESTION_CHOISE:
                            item.items = [];
                            node.data.choise_items.forEach((i) => {
                                item.items.push({
                                    title: i.value,
                                    next_id: i.output.connections[0].input.node.id,
                                });
                            });
                            break;
                    }

                    data.push(item);
                });
                this.data = data;
            },
            save_form() {

                api.post('/forms', {
                    title: this.title,
                    ownerId: 2,
                    QuestionsData: JSON.stringify(this.data),
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
           
            },



            async init() {
                this.editor = new Rete.NodeEditor('demo@0.1.0', this.$refs.rete)


                this.editor.use(ConnectionPlugin)
                this.editor.use(VueRenderPlugin)

                let start_node = new EndNode()
                let end_node = new StartNode()

                this.node_builders = [
                    start_node,
                    end_node,
                    new TextQuestionNode(),
                    new ChoiseQuestionNode(),
                    new InfoBlockNode()
                ]

                this.node_builders.forEach(n => this.editor.register(n))

                this.editor.view.resize();

                this.editor.addNode(await start_node.createNode({ m_socket: this.m_socket }));
                this.editor.addNode(await end_node.createNode({ m_socket: this.m_socket }));
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style>
    /*.wrapper {
        height: 100%;
    }*/
    .dock-components{
        z-index: 100;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 180px;
    }

    .editor {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        height: 700px;
    }
    .container {
        flex: 1;
        overflow: hidden;
    }
</style>
