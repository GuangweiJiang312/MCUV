<template>
  <div id="app">
    <intro ref="intro"  @start = start></intro>
    <mainFrame v-show="showContent" class = "animated zoomIn">
      <navHead slot="navHead"></navHead>
      <mainBody slot="bodyMain" :full-height="fullHeight" :full-width="fullWidth"></mainBody>
    </mainFrame>
  </div>
</template>

<script>
  import intro from 'components/common/intro'
  import mainFrame from "./components/content/mainFrame";
  import navHead from "./components/common/navHead/navHead";
  import mainBody from "./components/content/mainBody/mainBody";

  export default {
    name:'app',
    components:{
      intro,
      mainFrame,
      navHead,
      mainBody
    },
    data(){
      return{
        showContent:false,
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
      start(){
        this.showContent = true
      },
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
