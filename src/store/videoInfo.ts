import { defineStore } from "pinia";
import { ref } from "vue";


export const useVideoInfoStore = defineStore('VideoInfo', () => {
  const homeVideoInfo = ref([
    {
      id: 0,
      title: 'What are you doing!（魔性剪辑）',
        src: new URL("../assets/images/video1.jpg", import.meta.url),
      link: "https://www.bilibili.com/video/BV12V4y1F7j9/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "0"
    },
  {
    id: 1,
    title: '晒你2024拜年祭单品】来自新世界',
    src: new URL("../assets/images/video2.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1zH4y1Y7Ht/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "1"
  },
  {
    id: 2,
    title: '晒你2024拜年祭单品】思 考 过 载',
    src: new URL("../assets/images/video3.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1jy421h7Nk/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "2"
  },
  {
    id: 3,
    title: '【86/梅菲斯特】纵使硝烟分离两人',
    src: new URL("../assets/images/video4.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1Vy421h7M6/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "3"
  },
  {
    id: 4,
    title: '【魔法少女小圆/MAD】不爱我，就去死吧（重制版）',
    src: new URL("../assets/images/video5.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1Mm41197dR/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "4"
  },
  {
    id: 5,
    title: '【西电Shining动漫社/MEP】Baby you',
    src: new URL("../assets/images/video6.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1Zw411Y7X2/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "5"
  },
  {
    id: 6,
    title: '【MIKU/魔法未来2018/MMD】Hand in Hand',
    src: new URL("../assets/images/video7.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1eg41197wg/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349"
  },
  {
    id: 7,
    title: '【托尔 · 艾露玛】ねぇねぇねぇ。（龙女仆版呐呐呐。）',
    src: new URL("../assets/images/video8.jpg", import.meta.url),
    link: "https://www.bilibili.com/video/BV1NF4m1M7tD/?spm_id_from=333.999.0.0&vd_source=f5bba81ca8b73b2852e36b66ab1dc349",
    alt: "7"
  },
  ])

return { homeVideoInfo }
})