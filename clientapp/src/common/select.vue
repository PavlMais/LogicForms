<template>
    <select class="custom-select custom-select-sm" v-model="selected" id="inputGroupSelect01">
        <option v-for="(item, index) in items" :value="item" :key="index">{{item}}</option>
    </select>
</template>

<script>
    export default {
        props: ['items', 'value'],
        data() {
            return {
            }
        },
        methods: {
            change(e) {
                this.selected = e.target.value;
                this.$emit('change', this.selected)
            },
        },
        computed: {
            selected: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        }
    }


</script>