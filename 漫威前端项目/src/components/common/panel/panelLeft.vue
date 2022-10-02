<template>
    <div class="panel animated" :class="{'fadeOutLeft': !isShowLeft,'fadeInLeft' : isShowLeft}">
        <img src="~assets/img/mainBody/close.png" alt="" @click="closePanel" class = "close">
        <charProfile></charProfile>
    </div>
</template>

<script>
    import charProfile from "views/panelLeftView/charProfile";

    export default {
        name: "panelLeft",
        components:{
            charProfile
        },
        data(){
            return{
                isShowLeft:false
            }
        },
        methods:{
            closePanel(){
                this.isShowLeft = false
            }
        }
    }
</script>

<style scoped>
    .panel{
        position: relative;
        /*background-color: rgba(50,200,100,0.5);*/
        background-image: url("~assets/img/panel/panelBack1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 260px;
        height: 580px;
    }
    .close{
        position: absolute;
        right: 26px;
        top: 20px;
        width: 14px;
        height: 14px;
    }
    .close:hover{
        /*background-color: rgba(255,255,255,0.3);*/
        animation:jello 2s;
    }

</style>