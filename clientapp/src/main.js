import Vue from 'vue'
import App from './App.vue'
import VueAxios from './plugins/axios'
import Router from 'vue-router'

import Hello from './components/HelloWorld.vue'


Vue.use(VueAxios)
Vue.use(Router)
Vue.config.productionTip = false


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Hello,
        },
        {
            path: '/post/:id',
            name: 'Post',
            component: Post,
            props: true
        },
    ]
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
