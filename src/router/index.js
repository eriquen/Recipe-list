import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddCuisine from '@/components/AddCuisine'
import EditCuisine from '@/components/EditCuisine'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-cuisine',
      name: 'AddCuisine',
      component: AddCuisine
    },
    {
      path: '/edit-cuisine/:cuisine_slug',
      name: 'EditCuisine',
      component: EditCuisine
    }
  ]
})
