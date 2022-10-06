<template>
    <div class = "bg">
        <div class = "start animated flipInY">
            <span class = "text">START</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "getStart",
        data(){
          return{
          }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .bg{
        position: fixed;
        /*top: 50%;*/
        left: 50%;
        transform: translate(-50%, 0);

        z-index: 10;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .start{
        width: 120px;
        height: 50px;
        color: white;
        font-size: 26px;
        border-radius: 200px;
        border: white 3px solid;

        text-align: center;
        font-weight: bolder;
        font-family: "楷体";


        cursor: pointer;
        transition: all 0.6s;
    }
    .text{
        line-height: 50px;
    }

    .start:hover{
        background-color: rgba(255,255,255,0.3);
        animation:heartBeat 2s
    }
</style>