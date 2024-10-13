<template>
  <div class="silder-container" @mouseover="stopAutoplay" @mouseleave="autoplay" @touchstart="stopAutoplay"
    @touchend="autoplay" @touchcancel="autoplay">
    <div class="arrow">
      <div class="left" @mousedown="leftActive" @mouseup="leftDisacitive" @touchstart="leftActive"
        @touchend="leftDisacitive" @touchcancel="isLeftAcitive = false" :class="{ active: isLeftAcitive }">
      </div>
      <div class="right" @mousedown="rightActive" @mouseup="rightDisacitive" @touchstart="rightActive"
        @touchend="rightDisacitive" @touchcancel="isRightAcitive = false" :class="{ active: isRightAcitive }">
      </div>
    </div>
    <ul class="images">
      <li><img :src="images[images.length - 1].src.href" :alt="images[images.length - 1].alt"></li>
      <li v-for="{ id, src, alt } in images" :key="id"><img :src="src.href" :alt="alt"></li>
      <li><img :src="images[0].src.href" :alt="images[0].alt"></li>
    </ul>
    <ul class="bar">
      <li v-for="{ id } in images" :key="id" :class="{ active: id == index }"></li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Carousel">
import { ref } from 'vue'
import { onMounted } from 'vue';

const images = ref([
  {
    id: 0,
    src: new URL("../assets/images/1.png", import.meta.url),
    alt: "陈晓月"
  },
  {
    id: 1,
    src: new URL("../assets/images/2.png", import.meta.url),
    alt: "集章册正面"
  },
  {
    id: 2,
    src: new URL("../assets/images/3.png", import.meta.url),
    alt: "若似霜"
  },
  {
    id: 3,
    src: new URL("../assets/images/4.png", import.meta.url),
    alt: "集章册反面"
  },
  {
    id: 4,
    src: new URL("../assets/images/5.png", import.meta.url),
    alt: "表表表面"
  }
])

const isLeftAcitive = ref(false)
const isRightAcitive = ref(false)
const index = ref(0)
let domImages: HTMLElement
let timerAutoplay: number | null
//由于我们要在按下左箭头时，右箭头也一起节流，所以我们无法使用封装好的throttle函数。
//如果需要使用，请先将throttle()赋值给一个常量，在@事件被触发时调用这个常量，否则节流/防抖将不生效。
let timerActive: number | null
let timerDisactive: number | null

onMounted(() => {
  domImages = document.querySelector('.images') as HTMLElement
  autoplay()
})

function leftActive() {
  if (!timerActive) {
    isLeftAcitive.value = true
    timerActive = setTimeout(() => {
      timerActive = null
    }, 1000)
  }
}
function rightActive() {
  if (!timerActive) {
    isRightAcitive.value = true
    timerActive = setTimeout(() => {
      timerActive = null
    }, 1000)
  }
}
function leftDisacitive() {
  if (!timerDisactive) {
    //改变左箭头颜色
    isLeftAcitive.value = false
    //改变图片
    index.value--
    domImages.style.transition = 'all 1s ease-in-out'
    domImages.style.transform = `translate3d(-${(index.value + 1) * 1200}px,0,0)`
    //判断如果到了最前一张
    if (index.value == -1) {
      //初始化index=images.value.length-1
      index.value = images.value.length - 1
      //设置定时器把第一张变为最后一张
      setTimeout(() => {
        domImages.style.transform = `translate3d(-${(index.value + 1) * 1200}px,0,0)`
        domImages.style.transition = 'none'
      }, 1000);//定时器时间设置为1000毫秒，与过渡时间相等
    }
    timerDisactive = setTimeout(() => {
      timerDisactive = null
    }, 1000)
  }
}

function rightDisacitive() {
  if (!timerDisactive) {
    //改变右箭头颜色
    isRightAcitive.value = false
    //改变图片
    index.value++
    domImages.style.transition = 'all 1s ease-in-out'
    domImages.style.transform = `translate3d(-${(index.value + 1) * 1200}px,0,0)`
    //判断如果到了最后一张
    if (index.value == images.value.length) {
      //初始化index=0
      index.value = 0
      //设置定时器把最后一张变为第一张
      setTimeout(() => {
        domImages.style.transform = `translate3d(-1200px,0,0)`
        domImages.style.transition = 'none'
      }, 1000);//定时器时间设置为1000毫秒，与过渡时间相等（需要节流。因为如果两次点击在1000内，则会在被定时器内的回调函数的动画强制拽回index=0时的视图）
    }
    timerDisactive = setTimeout(() => {
      timerDisactive = null
    }, 1000)
  }
}

function autoplay() {
  if (!timerAutoplay) {
    timerAutoplay = setInterval(() => {
      index.value++
      domImages.style.transition = 'all 1s ease-in-out'
      domImages.style.transform = `translate3d(-${(index.value + 1) * 1200}px,0,0)`
      //判断如果到了最后一张
      if (index.value == images.value.length) {
        //初始化index=0
        index.value = 0
        //设置定时器把最后一张变为第一张
        setTimeout(() => {
          domImages.style.transform = `translate3d(-1200px,0,0)`
          domImages.style.transition = 'none'
        }, 1000);//定时器时间设置为1000毫秒，与过渡时间相等（需要节流。因为如果两次点击在1000内，则会在被定时器内的回调函数的动画强制拽回index=0时的视图）
      }
    }, 3000)
  }
}

function stopAutoplay() {
  if (timerAutoplay) clearInterval(timerAutoplay)
  timerAutoplay = null
}
</script>

<style lang="scss" scoped>
@use "sass:math";

.silder-container {
  position: relative;
  overflow: hidden;
  width: 1200px;
  height: 350px;
  border-radius: 20px;

  .arrow {
    .left {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 20px;
      transform: translateY(-50%) rotate(225deg);
      width: 30px;
      height: 30px;
      border-top: 5px solid gainsboro;
      border-right: 5px solid gainsboro;
      border-radius: 5px;
      transition: all 0.1s ease-in-out;

      &:hover {
        cursor: pointer;
      }
    }

    .right {
      position: absolute;
      z-index: 1;
      top: 50%;
      right: 20px;
      transform: translateY(-50%) rotate(45deg);
      width: 30px;
      height: 30px;
      border-top: 5px solid gainsboro;
      border-right: 5px solid gainsboro;
      border-radius: 5px;
      transition: all 0.1s ease-in-out;

      &:hover {
        cursor: pointer;
      }
    }

    .active {
      border-top: 5px solid white;
      border-right: 5px solid white;
      scale: 0.9;
    }
  }

  .images {
    display: flex;
    transform: translate3d(-1200px, 0, 0);
    transition: all 1s ease-in-out;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1200px;
      min-width: 1200px;
      height: 350px;

      img {
        height: 98%;
        box-shadow: 0px 0px 2px 2px rgba($color: #b2b2b247, $alpha: 0.3);
      }
    }
  }

  .bar {
    display: flex;
    position: absolute;
    z-index: 1;
    bottom: 10px;
    width: 100%;
    justify-content: center;

    li {
      width: 40px;
      height: 10px;
      background-color: gainsboro;
      border-radius: 10px;
      margin-right: 5px;
      transition: all 0.5s ease-in-out;
      box-shadow: 0px 0px 2px 2px rgba($color: #b2b2b247, $alpha: 0.3);
    }

    .active {
      background-color: white;
    }
  }
}
</style>