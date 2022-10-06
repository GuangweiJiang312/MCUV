<template>
    <div class="charts animated bounceIn">
        <div id="myChart2" :style="{margin:'0 auto', top:'60px',width: '600px', height: '520px', style:'50%'}"> </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'chart2',

        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                var dom = document.getElementById("myChart2");
                var myChart = echarts.init(dom);
                //var app = {};
                var option = null;


                option = {
                    title: {
                        text: '漫威系列电影评分榜',
                        left:'220px',
                        textStyle: {
                            fontSize: 16,//字体大小
                            color: '#ffffff'//字体颜色
                        }
                    },
                    tooltip: {},
                    legend: {
                        data: ['复仇者联盟','美国队长','蜘蛛侠','银河护卫队','钢铁侠','雷神' ],
                        top:'500px',
                        color:'#fff',
                        textStyle: {
                            fontSize: 16,//字体大小
                            color: '#ffffff'//字体颜色
                        }
                        },
                    radar: {
                        //shape: 'circle',
                        //top:'40px',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '烂番茄', max: 10},
                            { name: '电影资料库', max: 10},
                            { name: '好莱坞', max: 10},
                            { name: '时光网', max: 10},
                            { name: '豆瓣电影', max: 10},
                            { name: '电影影评网', max: 10}
                        ]
                    },
                    series: [{
                        name: '漫威系列电影评分榜',
                        type: 'radar',
                        top:'20px',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [9.3, 8.9, 9.2, 8.4, 9.6, 8.7],
                                name: '复仇者联盟'
                            },
                            {
                                value: [9.1, 8.6, 9.0, 8.6, 9.4, 8.8],
                                name: '美国队长'
                            },
                            {
                                value: [9.4, 9.0, 9.1, 8.7, 9.6, 8.9],
                                name: '蜘蛛侠'
                            },
                            {
                                value: [9.3, 8.7, 8.7, 8.8, 9.4, 9.0],
                                name: '银河护卫队'
                            },
                            {
                                value: [9.1, 9.0, 9.0, 9.0, 9.3, 9.1],
                                name: '钢铁侠'
                            },
                            {
                                value: [8.7, 9.1, 9.2, 9.4, 9.0, 8.6],
                                name: '雷神'
                            }
                        ]
                    }]
                };
                myChart.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>