<template>
    <div id="rete" v-show="visible" ref="rete" class="q-card">
        <input type="text" v-bind:placeholder="question">
        <div class="q-card-dot">
        </div>
        <div>
            <select class="q-card-select" name="cars" id="cars">
                <option value="volvo">Text</option>
                <option value="saab">Number</option>
                <option value="opel">Choise</option>
                <option value="audi">Multi Choise</option>
            </select>
        </div>
        <div>
            <button>Add filter</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "QCard",
        components: {},
        props: ['id', 'question'],
        data() {
            return {}
        },
    }
</script>

<style>
    .q-card {
        margin: 0px;
        padding: 5px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: gray;
        float: left;
        position: relative;
    }

    .q-card-dot {
        border-radius: 50%;
        background-color: red;
        height: 10px;
        width: 10px;
        left: -15px;
        position: absolute;
    }
</style>