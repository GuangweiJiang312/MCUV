<template>
    <el-drawer
            title=""
            :visible.sync="drawer"
            :with-header="false" :modal = "false"  class="profile">
        <img src="~assets/img/mainBody/close.png" alt="" @click="drawer = false" class = "close">

        <scroll :roll-height=fullHeight>
            <div slot="content">
                <img :src=imgHeadUrl class = "headImage">
                <div class = "mainId">{{profile.name}}</div>
                <div class = "detail">
                    <p v-show="profile.full_name">Full name:{{profile.full_name}}</p>
                    <p v-show="profile.alias">Alias:{{profile.alias}}</p>
                    <p v-show="profile.species">Species:{{profile.species}}</p>
                    <p v-show="profile.status">Status:{{profile.status}}</p>
                    <p v-show="profile.played_by">Played By:{{profile.played_by}}</p>
                </div>
                <div class="description">
                    <p>{{description}}</p>
                </div>

                <div><img :src=imgDetailUrl class="detailImg" @error="unableFootImg" v-show="showFootImg"/></div>

            </div>
        </scroll>
    </el-drawer>
</template>

<script>
    import {request} from "network/request";
    import scroll from "../../common/scroll/scroll";

    export default {
        name: "profile",
        components:{
            scroll
        },
        props:{
            fullHeight:Number
        },
        data(){
          return{
              id:'',
              profile:Object,
              description:String,
              drawer:false,
              showFootImg:true
          }
        },
        computed:{
            imgHeadUrl(){
                return 'http://106.52.187.27:8088/marvel_svg/'+this.id+'.svg'
            },
            imgDetailUrl(){
                return 'http://106.52.187.27:8088/marvel_screenshot/'+this.id+'.jpg'
            }
        },
        mounted(){
            this.getItemId()
        },
        methods:{
            getItemId(){
                this.$bus.$on('clickItem',res => {
                    this.showFootImg = true
                    this.id = res
                    request({
                        url:'/description?id='+res
                    }).then(res => {
                        this.description = res[0].description
                    })

                    request({
                        url:'/profile?id='+res
                    }).then(res => {
                        console.log(res);
                        this.profile = res[0]
                    })

                    this.drawer = true
                })
            },
            unableFootImg(){
                this.showFootImg = false
            }
        }
    }
</script>

<style scoped>
    .profile{
        color: #131d27;
        font-family: " 楷体";
    }
    /deep/.el-drawer{
        background-color: aliceblue;
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

    .headImage{
        display: block;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 10px;
        width: 180px;
    }

    .mainId{
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .detail p{
        font-size: 16px;
        margin-left: 30px;
        line-height: 26px;
    }

    .description{
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 30px;
    }

    .description p{
        font-size: 16px;
    }

    .detailImg{
        display: block;
        width: 90%;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 40px;
     }
</style>