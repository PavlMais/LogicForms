<template>
    <div :class="[selected(), node.name] | kebab">
        <div class="card text-white bg-dark rounded p-2">
            <p class="font-weight-bold text-center">{{node.name}}</p>
            <div class="row">
                <div class="my_col">
                    <!-- Inputs-->
                    <div class="input" v-for="input in inputs()" :key="input.key">
                        <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
                        <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
                    </div>
                </div>
                <div class="col-8 px-0">
                    <div class="input-group input-group-sm mb-3">
                        <input type="text" v-model="node.data.title" class="form-control" placeholder="Text" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                    </div>
                </div>
                <div class="my_col">
                    <!-- Outputs-->
                    <div class="output" v-for="output in outputs()" :key="output.key">
                        <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Rete from 'rete';
    import VueRenderPlugin from 'rete-vue-render-plugin';
    import Socket from '../controls/Socket.vue';

    export default {
        mixins: [VueRenderPlugin.mixin],
        props: ['node', ],
        components: {
            Socket
        },
        data: function () {
            return {
            }
        },
        created() {
            this.node.data.title = "";
        },
        methods: {
            add_confition: function (event) {
                const numSocket = new Rete.Socket('Number value');


                let out = new Rete.Output('num32', 'Next question', numSocket);
                this.node.addOutput(out);
                this.node.update();
            }
        }
    }
</script>

<style>
    .my_col {
        width: 100%;
        flex-basis: 0;
        -webkit-box-flex: 1;
        flex-grow: 1;
        max-width: 100%;
    }

    .socket {
        width: 15px;
        height: 15px;
    }
</style>


