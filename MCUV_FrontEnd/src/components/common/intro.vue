<template>
    <div class="intro">
<!--        <getStart v-show = "isShowStart" @click.native="start"></getStart>-->
        <div class = "backcolor animated fadeIn" v-show="show">
            <p class = "ptop animated fadeIn" v-show="showTitle">
                Marvel Cinematic Universe GIS
            </p>
            <br>
            <div class="content animated fadeIn" v-show="showContent">
                <p>
                    我们项目设置了漫威取景地、漫威英雄轨迹、漫威英雄关系图谱等可视化功能，让您更加生动直观地漫游漫威宇宙
                </p>
                <p>
                    漫威——取景地：显示取景地及信息，取景地街景及电影片段
                </p>
                <p>
                    漫威——英雄轨迹：漫威英雄轨迹，根据英雄、电影检索轨迹，拖动时间轴查看英雄轨迹
                </p>
                <p>
                    漫威——关系图谱：漫威英雄之间的关系图，同时，本视图提供漫威英雄简介信息
                </p>
                <p>
                    漫威——分析图表：我们提供了电影票房、英雄人气等多种图表展现方式
                </p>
                <p>
                    漫威——众源数据：我们提供了接口供用户上传自己的数据，上传数据后可直接在在视图中查看，待审核通过后其他用户也可看到
                </p>
                <p>
                    我们的数据您可通过以下接口查看：<a href="http://106.52.187.27:8088/api">http://106.52.187.27:8088/api</a>
                </p>
                <br>
            </div>
            <p class = "pbot animated fadeIn" v-show="contactUs">
                <a href="https://github.com/Ceoilmp/hello-world">欢迎加入我们！！！</a>
            </p>
            <div  class = "getStart" v-show = "isShowStart">
                <getStart v-show = "isShowStart" @click.native="start"></getStart>
            </div>
        </div>
        <transition leave-active-class="fadeOut" mode="out-in">
            <video v-if="show" autoplay="autoplay" name="media" ref = "videos" muted src="~assets/video/video.mp4" class="animated" loop></video>
        </transition>
    </div>
</template>

<script>
    import getStart from "./getStart";

    export default {
        name: "intro",
        components:{
            getStart
        },
        mounted() {
            setTimeout(() => {
                this.showTitle = true;
            },3000)
            setTimeout(() => {
                this.showContent = true;
            },5000)
            setTimeout(() => {
                this.contactUs = true;
            },6500)
            setTimeout(() => {
                this.isShowStart = true;
            },8000)
        },
        data(){
            return{
                isShowStart:false,
                show:true,
                showTitle:false,
                showContent:false,
                contactUs:false
            }
        },
        methods:{
            start(){
                this.show = false;
                this.isShowStart = false
                this.showTitle = false;
                this.showContent = false;
                this.contactUs = false;
                this.isShowStart = false;
                this.$emit('start')
            }
        }
    }
</script>

<style scoped>
.intro{
    width: 100%;
    height: 100%;
}

video {
    display: block;
    min-height: 100%;
    min-width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
    .backcolor{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 9;
        background-color: rgba(0,0,0,0.3);

        color: white;
        padding-top: 50px;
    }

    .backcolor p{
        display: block;
        margin: 0 auto;
        width: 900px;
        padding-top: 14px;
        padding-bottom: 14px;

    }

    .backcolor p a{
        color: white;
    }

    .ptop{
        border-top: white 2px solid;
        font-family: "PingFang SC Medium";
        font-size: 60px;
        text-align: center;

    }

    .pbot{
        border-bottom: white 2px solid;
        font-size: 20px;
    }

    .getStart{
        margin-top: 20px;
    }

    .content p{
       padding-left: 30px;
    }

</style>