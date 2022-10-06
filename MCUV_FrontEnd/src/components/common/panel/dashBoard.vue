<template>
    <div>
        <circle-menu type="middle-around" :number="4" animate="animated jello" btn circle>
            <div slot="item_1" @click="clickView1"><img class="content"></div>
            <div slot="item_2" @click="clickView2"><img class="content"></div>
            <div slot="item_3" @click="clickView3"><img class="content"></div>
            <div slot="item_4" @click="clickView4"><img class="content"></div>
        </circle-menu>
    </div>
</template>

<script>
    export default {
        name: "dashBoard",
        methods:{
            clickView1(){
                this.$router.push('/view1')
            },
            clickView2(){
                this.$router.push('/view4')
            },
            clickView3(){
                this.$router.push('/view3')
            },
            clickView4(){
                this.$router.push('/view2')
            }
        }
    }
</script>

<style scoped>
/deep/.oy-menu-btn{
    background: url("~assets/img/panel/menuBack.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
/deep/.icon-bars{
    background-color: #409EFF;
}
/deep/.icon-bars:after{
    background-color: #409EFF;
}
    /deep/.oy-menu-item_1{
        background: url("~assets/img/panel/item1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
/deep/.oy-menu-item_2{
    background: url("~assets/img/panel/item2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
/deep/.oy-menu-item_3{
    background: url("~assets/img/panel/item3.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
/deep/.oy-menu-item_4{
    background: url("~assets/img/panel/item4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
/deep/.oy-menu-item:hover{
    animation:heartBeat 2s
}
    .content{
        width: 100%;
        height: 100%;
    }
</style>