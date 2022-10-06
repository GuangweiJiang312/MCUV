<template>
    <div class="navHead">
        <navBar>
            <img src="~assets/img/logo.png" alt="" class="logo" slot="left">
            <span slot="middle">Marvel Cinematic Universe GIS</span>
            <div slot="right">
                <span @click="returnMain">
                    <img src="~assets/img/head/return.png" alt="" slot="right">
                </span>
            </div>
        </navBar>
    </div>
</template>

<script>
    import navBar from "components/content/navBar/navBar";
    export default {
        name: "navHead",
        components:{
            navBar
        },
        methods: {
            handleCommand(command) {
                this.$message('click on item ' + command);
                console.log(command);
            },
            returnMain(){
                this.$router.push('/mainPanel')
            }
        }
    }
</script>

<style scoped>
    .navHead{
        color: #ffffff;
        font-weight:lighter;
        font-size: 24px;
        /*border-radius: 50px;*/
        /*border: #009eea solid 1px;*/
        background-image: url("~assets/img/head/headBack.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .navHead img{
        height: 26px;
        margin-top: 10px;
        cursor: pointer;
    }
    /*.el-dropdown-link {*/
    /*    cursor: pointer;*/
    /*    color: #409EFF;*/
    /*}*/
    /*.el-icon-arrow-down {*/
    /*    font-size: 12px;*/
    /*}*/
</style>