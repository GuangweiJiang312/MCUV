<template>
    <el-container>
        <el-header>
            <navHead></navHead>
        </el-header>
        <el-container>
            <el-aside width="220px" :style="{height:scrollHeight+'px'}">
                <right></right>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import navHead from "./content/navHead";
    import right from "./content/right";
    export default {
        name: "mainBody",
        components:{
            navHead,
            right
        },
        props:{
            fullHeight:Number
        },
        computed:{
            scrollHeight(){
                return this.fullHeight - 90
            }
        },
    }
</script>

<style scoped>
    .el-header {
        background-color: #0090ff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        /*background-color: #D3DCE6;*/
        color: #333;
        text-align: center;
        line-height: 250px;
        /*height: 800px;*/
    }

    .el-aside::-webkit-scrollbar{
        display: none;
    }


    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        height: 800px;
    }
</style>