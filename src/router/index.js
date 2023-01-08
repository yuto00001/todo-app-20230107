import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import SignIn from '../views/signIn.vue'
import login from '../views/login.vue'
import googleSignIn from '../views/googleSignIn.vue'
import myPage from '../views/myPage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/myPage',
    name: 'myPage',
    component: myPage
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/googleSignIn',
    name: 'googleSignIn',
    component: googleSignIn
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
