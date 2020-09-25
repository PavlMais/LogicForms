import Vue from 'vue'
import App from './App.vue'
import VueAxios from './plugins/axios'

import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueAxios)
Vue.config.productionTip = false

Array.prototype.remove = function (item) {
    return this.splice(this.indexOf(item), 1);
}


new Vue({
    render: h => h(App),
    router,
    components: { App }
}).$mount('#app')
