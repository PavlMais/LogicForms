<template>
    <div class="container mb-3">

    <div class="card text-white bg-dark">
       
        <div class="card-body">
            <h5 class="card-title text-white">{{item.title}}</h5>

            <select class="custom-select" @change="selectChanged" id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option  v-for="(op, index) in item.items" :value="op.next_id" :key="index">{{op.title}}</option>
                
            </select>

        </div>
    </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        methods: {
            selectChanged(event) {
                var selected_id = event.target.value;
                console.log('items');
                console.log(this.item.items);
                console.log('selected_id');
                console.log(selected_id);


                var item = this.item.items.filter(i => i.next_id == selected_id)[0];
                this.$emit('selectChanged', { selectedItem: item, item: this.item });
            }
        }
    }
</script>

<style>
    

</style>