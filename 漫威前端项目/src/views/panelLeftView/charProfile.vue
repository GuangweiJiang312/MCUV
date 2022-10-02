<template>
    <div v-show="show">
        <profileCharList v-show="showChar == 0"></profileCharList>
        <profileMovieList v-show="showChar == 1"></profileMovieList>
        <addData v-show="showChar == 2"></addData>
        <tabControl ref = "tabControl" :height=10 :width=200 :tabItem="['hero','movie','data']" class="tabBar" @tabClick = "tabClick"></tabControl>
    </div>
</template>

<script>
    import profileCharList from "./profileList/profileCharList";
    import profileMovieList from "./profileList/profileMovieList";
    import addData from "./profileList/addData";
    import tabControl from "components/common/tabControl/tabControl";

    export default {
        name: "charProfile",
        components:{
            profileCharList,
            tabControl,
            profileMovieList,
            addData
        },
        data(){
            return{
                showChar:0,
                show :false
            }
        },
        mounted(){
            setTimeout(() => {
                this.show = true;
             },3000)
        },
        methods:{
            tabClick(index){
                switch (index) {
                    case 0:
                        this.showChar = 0
                        break
                    case 1:
                        this.showChar = 1
                        break
                    case 2:
                        this.showChar = 2
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .tabBar{
        margin: 0 auto;
    }
</style>