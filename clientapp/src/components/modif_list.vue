<template>
    <div>
        <div class="input-group input-group-sm" v-for="(item, index) in items" :key="item.id">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">{{index + 1}}</span>
            </div>
            <input  type="text" class="form-control" v-model="item.value" aria-label="Small" placeholder="Item" aria-describedby="inputGroup-sizing-sm">
            <div class="input-group-append">
                <button class="btn btn-light" @click="delete_item(item)" type="button">x</button>
            </div>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">{{items.length + 1}}</span>
            </div>
            <input type="text" @keyup.enter="add_item" v-model="current_item" class="form-control" aria-label="Small" placeholder="Item" aria-describedby="inputGroup-sizing-sm">
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                current_item: '',
                items: [],
                last_item_id: 0
            }
        },
        methods: {
            add_item() {
                var new_item = { id: this.last_item_id++, value: this.current_item };
                this.items.push(new_item);
                this.current_item = '';
                this.$emit('itemAdded', new_item);
            },
            delete_item(item) {
                var item_id = item.id;
                this.items.splice(this.items.indexOf(item), 1);
                this.$emit('itemRemoved', item_id);
            }   
        }
    }
</script>
<style></style>