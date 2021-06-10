import Vue from 'vue'
import Router from 'vue-router'
import Module1 from '@/modules/Module1/'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/Home/cs1',
        name: '/Home/cs1',
        component: Module1
    },
  ]

})
