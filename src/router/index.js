import { createRouter, createWebHashHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import CartView from '../views/CartView.vue'
import OrdersView from '../views/OrdersView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/menu' },
    { path: '/menu', component: MenuView },
    { path: '/cart', component: CartView },
    { path: '/orders', component: OrdersView },
  ]
})
