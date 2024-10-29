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
        <li>
          <a :href="images[images.length - 1].link" target="_blank"
            :class="{ 'hasLink': images[images.length - 1].link }">
            <img :src="serverURL + images[images.length - 1].path" :alt="images[images.length - 1].alt">
            <h1 :class="{ 'hidden': !images[images.length - 1].title }">{{ images[images.length - 1].title }}</h1>
          </a>
        </li>
        <li v-for="{ id, path, alt, link, title } in images" :key="id">
          <a :href="link" target="_blank" :class="{ 'hasLink': link }">
            <img :src="serverURL + path" :alt="alt">
            <h1 :class="{ 'hidden': !title }">{{ title }}</h1>
          </a>
        </li>
        <li>
          <a :href="images[0].link" target="_blank" :class="{ 'hasLink': images[0].link }">
            <img :src="serverURL + images[0].path" :alt="images[0].alt">
            <h1 :class="{ 'hidden': !images[0].title }">{{ images[0].title }}</h1>
          </a>
        </li>
      </ul>
    </div>
    <ul class="bar">
      <li v-for="(_, _index) in images" :key="_index" :class="{ active: _index == index }"></li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Carousel">
import { ref } from 'vue'
import { onMounted } from 'vue';
import { type CarouselImageArr } from '@/api/home';
import { serverURL } from '@/api/config';

//变量设定
const { images, width = '100%', borderRadius = '20px', shadowImage = true, aspectRatio = '3' } = defineProps<{ images: CarouselImageArr, width?: string, borderRadius?: string, shadowImage?: boolean, aspectRatio?: string }>()
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
    }, 3500)
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
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          height: 98%;
          position: relative;

          &.hasLink {
            cursor: pointer;
          }

          img {
            height: 100%;
            box-shadow: 0px 0px 2px 2px rgba($color: #00000047, $alpha: 0.1);
          }

          h1 {
            position: absolute;
            bottom: 0;
            left: 0;
            line-height: 100%;
            padding: 20px;
            padding-right: 35px;
            color: white;
            /* drop-shadow-md 转化后的 CSS */
            filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
            background: linear-gradient(to right, rgba($color: #ef4444, $alpha: 0.8), rgba($color: #ef4444, $alpha: 0));

            &.hidden {
              display: none;
            }
          }
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
      box-shadow: 0px 0px 1px 1px rgba($color: #7b7b7b, $alpha: .2);
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