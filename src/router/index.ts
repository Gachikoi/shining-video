import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      name:'首页',
      path: '/home',
      component:()=>import("@/views/home/Home.vue")
    },
    {
      name:'组员作品',
      path: '/video',
      component: () => import("@/views/video/Video.vue")
    },
    {
      name:'拜年祭',
      path: '/typesetting',
      component: () => import("@/views/typesetting/Typesetting.vue")
    },
    {
      name:'活动',
      path: '/activity',
      component: () => import("@/views/activity/Activity.vue")
    },
    {
      name: '历史',
      path: '/history',
      component: () => import("@/views/history/History.vue")
    },
    {
      path: '/',
      redirect:'home'
    },
    
  ]
})