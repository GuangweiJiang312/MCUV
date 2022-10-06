<template>
    <div class="first  animated bounceIn">
        <div class="chart1" @click="clickItem1">
            <img src="./chartView/1.png" alt="">
        </div>
        <div class="chart2" @click="clickItem2">
            <img src="./chartView/2.png" alt="">
        </div>
        <div class="chart3" @click="clickItem3">
            <img src="./chartView/3.png" alt="">
        </div>
        <div class="chart4" @click="clickItem4">
            <img src="./chartView/4.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "first",
        methods:{
            clickItem1(){
                this.$router.push('/chart1')
            },
            clickItem2(){
                this.$router.push('/chart2')
            },
            clickItem3(){
                this.$router.push('/chart3')
            },
            clickItem4(){
                this.$router.push('/chart4')
            },
        }
    }
</script>

<style scoped>
.first{
    height: 100%;
    width: 100%;
    text-align: center;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap:wrap;
}

.first div{
    flex: 1;
    width: 50%;
    height: 44%;
    min-width: 46%;

    border: white 1px solid;

    border-radius: 16px;
    overflow: hidden;
    transition: all 0.8s;
}

.first div:hover{
    transform: scale(1.1);

}

    .first img{
        width: 100%;
        height: 100%;
    }

    .chart1{
        margin-top: 16px;
        margin-left: 20px;
        margin-right: 10px;
        margin-bottom: 5px;
    }
.chart2{
    margin-top: 16px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 5px;
}
.chart3{
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 20px;
}
.chart4{
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>