import Vue from 'vue'
import App from './App.vue'
import Contador from './Contador.vue'

Vue.config.productionTip = false
Vue.component('Contador', Contador)

new Vue({
    render: h => h(App),
}).$mount('#app')