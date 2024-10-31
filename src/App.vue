<template>
  <Header ref="header" class="shadow-md md:shadow-none" @show-menu-nav="showMenuNav"></Header>
  <MenuNav :class="{ 'translate-x-0': isMenuHidden }" class="absolute z-10 md:hidden -translate-x-[100%] transition-all"
    @unshow-menu-nav="unshowMenuNav"></MenuNav>
  <Nav class="hidden md:block"></Nav>
  <router-view class="mt-10" v-slot="{ Component }">
    <keep-alive exclude="User">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Forum v-if="userStore.isLogin" class="mt-10" id="forum"></Forum>
  <ForumBanned v-else class="mt-10"></ForumBanned>
  <Footer class="mt-10"></Footer>
  <!-- Login弹窗 -->
  <Login v-if="dialogFormVisible" v-model="dialogFormVisible"></Login>
</template>

<script lang="ts" setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import MenuNav from './components/MenuNav.vue';
import Forum from './views/forum/Forum.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useTemplateRef } from 'vue';
import Login from './components/Login.vue';
import { emitter } from '@/utils/emitter';
import { useUserStore } from './store/user';
import ForumBanned from './views/forum/ForumBanned.vue';
import { useRoute } from 'vue-router';
import { nextTick } from 'vue';

const route = useRoute()

onMounted(async () => {
  emitter.on('showLogin', () => {
    dialogFormVisible.value = true
  })

  emitter.on('observeForum', async (val) => {
    await nextTick()
    count = val as number
    intersectionObserver.observe(document.getElementById('forum') as HTMLElement)
  })
  finishEmitterOn.value = true
})

onBeforeUnmount(() => {
  emitter.off('showLogin')
  emitter.off('observeForum')
})

let finishEmitterOn = ref(false)
let count: number
//回调函数会在被观察元素进入和离开视口的时候分别调用一次
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (count == 0) {
        count++
        return
      } else if (count == 1) {
        count++
        emitter.emit('loadForum')
      }
    }
  })
},
  {
    rootMargin: "0px 0px 200px 0px", // 提前 200px 触发
    threshold: 0, // 不要求元素实际显示部分比例
  });

const userStore = useUserStore()

const dialogFormVisible = ref(false)

let isMenuHidden = ref(false)
const header = useTemplateRef('header')

function showMenuNav(val: boolean) {
  isMenuHidden.value = val
}

function unshowMenuNav() {
  isMenuHidden.value = !isMenuHidden.value
  header.value!.isMenuHidden = isMenuHidden.value
}

watch(() => userStore.isLogin, () => {
  if (userStore.isLogin) {
    emitter.emit('observeForum', 1)
  }
})
watch(finishEmitterOn, () => {
  if (userStore.isLogin) {
    emitter.emit('observeForum', 0)
  }
})

//登录后，在个人中心界面刷新页面，app.vue重新挂载，虽然forum在视口内，但observer的回调函数不被触发。
//猜想：这可能是因为，在个人中心刷新页面后，userStore.isLogin=true，forum已经挂载，不满足intersectionObserver回调函数的触发条件——移入/移出视口。
//为什么在“首页”等界面，视口内有卸载的forum的情况下，登录会触发回调函数？
//猜想：登录触发forum挂载，相当于移入视口。
watch(() => route.path, () => {
  if (route.path.slice(0, 5) === '/user') {
    intersectionObserver.disconnect()
    emitter.emit('loadForum')
  }
},{once:true})
</script>

<style lang="css" scoped></style>