<template>
    <div class="mainBody" :style="{height:scrollHeight+'px'}" @mousemove="mouseMove">
        <img src="~assets/img/mainBody/arrLeft.png" alt="" class="arrleft animated fadeInLeft"
             :style="{top:scrollHeight/2+'px'}" v-show="showleftArr" @click=showLeftPanel
        >
        <panelLeft class="panel-left" ref="leftPanel"></panelLeft>
        <dashBoard class="dashBoard"></dashBoard>
        <profile class="profile" :full-height="fullHeight"></profile>
        <div class="backGround"></div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
<!--        <router-view></router-view>-->

    </div>
</template>

<script>
    import panelLeft from "../../common/panel/panelLeft";
    import dashBoard from "../../common/panel/dashBoard";
    import profile from "../profile/profile";

    export default {
        name: "mainBody",
        components:{
            panelLeft,
            dashBoard,
            profile
        },
        props:{
            fullHeight:Number,
            fullWidth:Number
        },
        data(){
          return{
              mosX:Number,
              mosY:Number,
              showleftArr:false,
          }
        },
        computed:{
            scrollHeight(){
                return this.fullHeight - 80
            }
        },
        mounted(){
        },
        methods:{
            mousePosition(ev){
                if(ev.pageX || ev.pageY){
                    return {x:ev.pageX, y:ev.pageY};
                }
                return {
                    x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                    y:ev.clientY + document.body.scrollTop - document.body.clientTop
                };
            },
            mouseMove(ev){
                ev = ev || window.event;
                var mousePos = this.mousePosition(ev);
                this.mosX = mousePos.x;
                this.mosY = mousePos.y;

                this.showArr()
            },
            showArr(){
                if(this.mosX < 50 && this.$refs.leftPanel.isShowLeft == false){
                    this.showleftArr = true
                }else{
                    this.showleftArr = false
                }
            },
            showLeftPanel(){
                this.$refs.leftPanel.isShowLeft = true
            }
        }
    }
</script>

<style scoped>
    .mainBody{
        color: white;
        /*background-image: url("~assets/img/mainBody/mainBodyBack.png");*/
        /*background-repeat: no-repeat;*/
        /*background-size: 100% 100%;*/
    }
    .backGround{
        position: fixed;
        left: 0;
        right: 0;
        top:65px;
        bottom: 0;
        z-index: 8;
        background-image: url("~assets/img/mainBody/mainBodyBack.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        pointer-events: none;
    }
.panel-left{
    position: fixed;
    left: 10px;
    top: 70px;
    z-index: 15;
}
    .arrleft{
        position: fixed;
        left: 6px;
        /*top: 300px;*/
        width: 14px;
        height: 14px;
        z-index: 15;
    }
    .dashBoard{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,-20%);
        z-index: 15;
    }

    .profile{
        position: fixed;
        z-index: 15;
    }
</style>