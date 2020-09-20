<template>
    <div>

        <div class="input-group input-group-sm mb-3">
            <select class="custom-select custom-select-sm">
                <option value="value">Equal</option>
                <option value="value">Include</option>
                <option value="value">Exclude</option>
                <option value="value">More</option>
            </select>
            <div>

                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>
        </div>
    

    </div>
</template>

<script>
    import Socket from '../controls/Socket.vue';

    import VueRenderPlugin from 'rete-vue-render-plugin';

    export default {
        mixins: [VueRenderPlugin.mixin],
        components: {
        },
        data: function () {
            return {
            }
        },
        methods: {
            
        }
    }
</script>

<style>

</style>