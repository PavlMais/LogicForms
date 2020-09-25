<template>
    <div :class="[selected(), node.name] | kebab">
        <div class="card text-white bg-dark rounded">

            <h5 class="m-3">{{node.name}}</h5>
            <div class="row mx-0">
                <div class="test">
                    <!-- Inputs-->
                    <div class="input" v-for="input in inputs()" :key="input.key">
                        <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
                        <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
                    </div>
                </div>
                <div class="col-10">
                    <!-- Controls-->
                    <div class="control" v-for="control in controls()" :key="control.key" v-control="control"></div>
                </div>
                <div class="test mt-1">
                    <!-- Outputs-->
                    <div class="output mt-2" v-for="output in outputs()" :key="output.key">
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
        components: {
            Socket,
        },
        props: ['node'],
        data: function () {
            return {}
        },
        methods: {
            del_node() {
                console.log('del')
                console.log(this.node)
            }
        }
    }
</script>

<style>
    .test {
        -webkit-box-flex: 0;
        flex: 0 0 8.333333%;
        max-width: 8.333333%;
        flex-basis: 0;
        flex-grow: 1;
        width: 100%;
    }

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


