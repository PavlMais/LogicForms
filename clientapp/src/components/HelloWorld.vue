<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <input v-model="message" placeholder="Username">
        <p>Message is: {{ message }}</p>
        <button v-on:click="add_user">Add 1</button>
    </div>
</template>

<script>
    import { api } from '@/plugins/axios'


export default {
    name: 'HelloWorld',
    props: {
    msg: String
    },
    data: function () {
        return {
            count: 0,
            message: ''
        }
        },
    methods: {
        add_user: function () {
            api.post('users', {UserName: this.message}).then(response => (this.message = response.data))

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
