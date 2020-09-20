import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import CreateForm from '@/views/create_form.vue'
import NotFound from '@/views/404.vue';
import Form from '@/views/form.vue';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/create-form',
            name: 'create-form',
            component: CreateForm,
        },
        {
            path: '/f-*',
            name: 'form',
            component: Form
        },
        {
            path: '*',
            name: 'not-found',

            component: NotFound
        }

    ]
})