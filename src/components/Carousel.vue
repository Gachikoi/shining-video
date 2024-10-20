<template>
  <div class="carousel">
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
    </div>
    <ul class="bar">
      <li v-for="{ id } in images" :key="id" :class="{ active: id == index }"></li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Carousel">
import { throttle } from '@/utils/extensions';
import { ref } from 'vue'
import { onMounted } from 'vue';

//接口定义
interface CarouselImage {
  id: number;
  src: URL;
  alt?: string
}

export type CarouselImages = CarouselImage[]

//变量设定
const { images, width='100%', borderRadius='20px', shadowImage=true, aspectRatio='3' } = defineProps<{ images: CarouselImages, width?: string, borderRadius?: string, shadowImage?: boolean, aspectRatio?: string }>()
const isLeftAcitive = ref(false)
const isRightAcitive = ref(false)
const index = ref(0)
let domImages: HTMLElement
let domContainer: HTMLElement
let timerAutoplay: number | null
//由于我们要在按下左箭头时，右箭头也一起节流，所以我们无法使用封装好的throttle函数。
//如果需要使用，请先将throttle()赋值给一个常量，在@事件被触发时调用这个常量，否则节流/防抖将不生效。
let timerActive: number | null
let timerDisactive: number | null

let func:Function
//钩子函数
onMounted(() => {
  //开启自动播放
  domImages = document.querySelector('.images') as HTMLElement
  autoplay();

  //根据传入的参数自定义轮播图样式
  const domCarousel = document.querySelector('.carousel') as HTMLElement
  domContainer = document.querySelector('.silder-container') as HTMLElement
  domContainer.style.borderRadius = borderRadius;
  domContainer.style.aspectRatio = aspectRatio
  domContainer.style.width = width
  document.querySelectorAll('.images li').forEach((li) => {
    const item = li as HTMLElement
    item.style.aspectRatio = aspectRatio
  });
  if (!shadowImage) {
    document.querySelectorAll('.images img').forEach((img) => {
      const item = img as HTMLElement
      item.style.boxShadow = 'none'
      item.style.objectFit = 'cover'
      item.style.height = 'auto'
    })
  }
})

//方法
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
    domImages.style.transform = `translate3d(-${(index.value + 1) * domContainer.offsetWidth}px,0,0)`
    //判断如果到了最前一张
    if (index.value == -1) {
      //初始化index=images.value.length-1
      index.value = images.length - 1
      //设置定时器把第一张变为最后一张
      setTimeout(() => {
        domImages.style.transform = `translate3d(-${(index.value + 1) * domContainer.offsetWidth}px,0,0)`
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
    domImages.style.transform = `translate3d(-${(index.value + 1) * domContainer.offsetWidth}px,0,0)`
    //判断如果到了最后一张
    if (index.value == images.length) {
      //初始化index=0
      index.value = 0
      //设置定时器把最后一张变为第一张
      setTimeout(() => {
        domImages.style.transform = `translate3d(-${domContainer.offsetWidth}px,0,0)`
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
      domImages.style.transform = `translate3d(-${(index.value + 1) * domContainer.offsetWidth}px,0,0)`
      //判断如果到了最后一张
      if (index.value == images.length) {
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

.carousel {
  width: 100%;

  .silder-container {
    position: relative;
    overflow: hidden;
    width: 100%;
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
        scale: 0.9;
      }
    }

    .images {
      display: flex;
      width: 700%;
      transform: translate3d(-14.2857%, 0, 0);
      transition: all 1s ease-in-out;

      li {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        width: 1/7;

        img {
          height: 98%;
          box-shadow: 0px 0px 1px 1px rgba($color: #b2b2b247, $alpha: 0.3);
        }
      }
    }
  }

  .bar {
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: 20px;
    justify-content: center;

    li {
      width: 30px;
      height: 10px;
      background-color: gainsboro;
      border-radius: 10px;
      box-shadow: 0px 0px 2px 2px rgba($color: #7b7b7b, $alpha: .2);
      margin-right: 10px;
      transition: all 0.5s ease-in-out;
    }

    .active {
      background-color: white;
      width: 54px;
    }
  }
}
</style>