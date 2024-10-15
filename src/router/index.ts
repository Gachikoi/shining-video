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
      name:'视频作品',
      path: '/video',
      component: () => import("@/views/video/Video.vue")
    },
    {
      name:'排版作品',
      path: '/typesetting',
      component: () => import("@/views/typesetting/Typesetting.vue")
    },
    {
      name:'活动',
      path: '/activity',
      component: () => import("@/views/activity/Activity.vue")
    },
    {
      path: '/',
      redirect:'home'
    },
    
  ]
})