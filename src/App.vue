<template>
  <Header ref="header" class="shadow-md md:shadow-none" @show-menu-nav="showMenuNav"></Header>
  <MenuNav :class="{ 'translate-x-0': isMenuHidden }" class="absolute z-10 md:hidden -translate-x-[100%] transition-all"
    @unshow-menu-nav="unshowMenuNav"></MenuNav>
  <Nav class="hidden md:block"></Nav>
  <router-view class="mt-10" v-slot="{ Component }">
    <keep-alive>
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useTemplateRef } from 'vue';
import Login from './components/Login.vue';
import { emitter } from '@/utils/emitter';
import { useUserStore } from './store/user';
import ForumBanned from './views/forum/ForumBanned.vue';


onMounted(() => {
  emitter.emit('observeForum', 0)

  emitter.on('showLogin', () => {
    dialogFormVisible.value = true
  })

  //传入0代表App.vue挂载，因为内容请求都是异步的，所以挂载时
  emitter.on('observeForum', (val) => {
    count = val as number
    //避免未登录时刷新界面，没有forum元素，却进行监听的报错
    if (document.getElementById('forum')) {
      // 开始监听
      console.log(3);

      intersectionObserver.observe(document.getElementById('forum') as HTMLElement);
    }
  })
})

onBeforeUnmount(() => {
  emitter.all.clear()
})

let count:number

//回调函数会在被观察元素进入和离开视口的时候分别调用一次
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
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
</script>

<style lang="css" scoped></style>