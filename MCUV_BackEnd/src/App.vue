<template>
  <div id="app">
    <mainBody :full-height="fullHeight"></mainBody>
  </div>
</template>

<script>
  import mainBody from "./components/mainBody";

  export default {
    name:'app',
    components:{
      mainBody
    },
    data(){
      return{
        fullHeight:Number,
        fullWidth:Number,
      }
    },
    created(){
      this.fullHeight = document.documentElement.clientHeight;
      this.fullWidth = document.documentElement.clientWidth;
    },
    mounted() {
      this.get_bodyHeight();
    },
    methods:{
      get_bodyHeight() {
        //动态获取浏览器高度
        const that = this;
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight;
            that.fullHeight = window.fullHeight;
          })();
        };
      },
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
