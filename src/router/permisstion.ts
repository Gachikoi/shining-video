import router from "./router";
import { useUserStore } from "@/store/user";

const whiteList = ['/home', '/works', '/representation', '/activity', '/about']

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({path:'/home'})
    }
  }
})