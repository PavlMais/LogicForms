<template>
    <div class="container mb-3">

    <div class="card text-white bg-dark">
       
        <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>

            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
            }
        }
    }
</script>

<style>
    

</style>