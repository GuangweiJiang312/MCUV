<template>
    <div class="navHead">
        <navBar>
            <img src="~assets/img/logo.png" alt="" class="logo" slot="left">
            <span slot="middle">Marvel Cinematic Universe 后台管理系统</span>
            <div slot="right">
<!--                <span @click="returnMain">-->
<!--                    <img src="~assets/img/head/return.png" alt="" slot="right">-->
<!--                </span>-->
            </div>
        </navBar>
    </div>
</template>

<script>
    import navBar from "../common/navBar/navBar";
    export default {
        name: "navHead",
        components:{
            navBar
        }
    }
</script>

<style scoped>
    .navHead{
        color: #ffffff;
        /*font-weight:bold;*/
        font-size: 24px;
        /*background-repeat: no-repeat;*/
        /*background-size: 100% 100%;*/
    }
    .navHead img{
        height: 30px;
        margin-top: 10px;
        cursor: pointer;
    }
</style>