import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UserLogin from '../views/UserLoginView.vue'
import ProductDetailView from '../views/ProductDetailView.vue';
import store from '@/store/index';
import UserCartView from "../views/UserCartView.vue";
import UserProfileView from '../views/UserProfileView.vue'
Vue.use(VueRouter)

const userAuth=JSON.parse(localStorage.getItem('userAuth'));
console.log(userAuth,"UserAuth");

const router = new VueRouter({
  mode: 'history',  
  base:process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        needsAuth:true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        needsAuth:true
      }
    },
    {
      path: '/user-login',
      name: 'user-login',
      component: UserLogin
    },
    {
      path: '/product-detail',
      name: 'ProductDetailView',
      component: ProductDetailView,
      meta: {
        needsAuth:true
      }
    },
    {
      path: '/user-cart',
      name: 'UserCartView',
      component: UserCartView,
      meta: {
        needsAuth:true
      }
    },
    {
      path: '/user-profile',
      name: 'UserProfileView',
      component: UserProfileView,
      meta: {
        needsAuth:true
      }
    },
  ]


});


router.beforeEach((to,from,next)=>{
  
  if (to.meta.needsAuth) {
    console.log(store?.state?.needAuth,"needAuth");
    if(userAuth) {
      next();
    }
    else{
      next('/user-login');
    }
  }
  else{
    next();
  }
})

export default router
