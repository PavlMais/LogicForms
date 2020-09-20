import Vue from 'vue'
import App from './App.vue'
import VueAxios from './plugins/axios'

import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueAxios)
Vue.config.productionTip = false




new Vue({
    render: h => h(App),
    router,
    components: { App }
}).$mount('#app')
