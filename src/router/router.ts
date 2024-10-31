import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      name:'首页',
      path: '/home',
      component:()=>import("@/views/home/Home.vue"),
    },
    {
      name:'组员作品',
      path: '/works',
      component: () => import("@/views/works/Works.vue"),
    },
    {
      name:'社刊',
      path: '/representation',
      component: () => import("@/views/representation/Representation.vue"),
    },
    {
      name:'活动',
      path: '/activity',
      component: () => import("@/views/activity/Activity.vue"),
    },
    {
      name: '关于我们',
      path: '/about',
      component: () => import("@/views/about/About.vue"),
    },
    {
      name: '个人中心',
      path: '/user',
      component: () => import("@/views/user/User.vue"),
      children: [
        {
          name: '更改用户信息',
          path: 'changeUserInfo',
          component:()=>import("@/views/user/changeUserInfo/ChangeUserInfo.vue")
        },
        {
          name: '提交成员信息',
          path: 'submitMemberInfo',
          component: () => import("@/views/user/submitMemberInfo/SubmitMemberInfo.vue")
        },
        {
          name: '提交作品信息',
          path: 'submitWorksInfo',
          component: () => import("@/views/user/editWorksInfo/EditWorksInfo.vue")
        }
      ]
    },
    {
      path: '/',
      redirect:'home'
    },
    
  ],
  scrollBehavior(to, from, savedPosition) {
      return {top:0}
  }
})