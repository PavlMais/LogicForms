<template>
    <div :class="[selected(), node.name] | kebab">
        <div class="card text-white bg-dark rounded p-2">

        <h5>{{node.name}}</h5>
        <div class="row">
            <div class="my_col">
                <!-- Inputs-->
                <div class="input" v-for="input in inputs()" :key="input.key">
                    <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
                    <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
                </div>
            </div>
            <div class="col-8">
                <!-- Controls-->
                <div class="control" v-for="control in controls()" :key="control.key" v-control="control"></div>
                <button type="button" @click="add_confition" class="btn btn-outline-light btn-sm mt-2">Add filter</button>
                <Condition v-for="condition in conditions" :key="condition.id"></Condition>
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
    import Condition from './Condition.vue'

    export default {
        mixins: [VueRenderPlugin.mixin],
        props: ['node', ],
        components: {
            Socket,
            Condition
        },
        data: function () {
            return {
                conditions: [{id:1, text:'test'}]
            }
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

    .socket{
        width: 15px;
        height: 15px;
    }
</style>


