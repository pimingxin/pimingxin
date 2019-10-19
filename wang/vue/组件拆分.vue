<style lang="stylus/less/scss/stylus/  scss" scoped> /* 如果带有scoped的话 最多只对这个组件的根组件有效果 */
  div{

  }
</style>

<template>
  <div>
    <Slider></Slider>
  </div>
</template>

<script>

  //如果要引用其他模板 可以将模板引进来
  //引用对象需要在component里面声明
  import { Slider } from './slider.vue'

  export default {
//组件定义对象
// 这时候就不需要template了 因为上面已经有template标签了
    data(){
      return {

      }
    },
    component:{
      Slider: Slider
    },
    methods: {
      
    },
    watch: {
      
    },
  }


</script>