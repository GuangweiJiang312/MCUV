<template>
<!--    <div class = "animated bounceIn">-->
<!--        <img src="./1.png" alt="">-->
<!--    </div>-->
    <div class="charts animated bounceIn">
        <div id="myChart1" :style="{margin:'0 auto',top:'60px', width: '1200px', height: '500px', style:'50%'}"> </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'chart1',

        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                var dom = document.getElementById("myChart1");
                var myChart = echarts.init(dom);
                //var app = {};
                var option = null;


                    option = {
                        title: { text: '漫威英雄系列电影票房占比',left:'500px',textStyle: {
                                fontSize: 16,//字体大小
                                color: '#ffffff'//字体颜色
                            }},
                        legend: {top:'18px',textStyle: {
                                fontSize: 14,//字体大小
                                color: '#ffffff'//字体颜色
                            }},
                        tooltip: {

                            trigger: 'axis',
                            showContent: true,

                        },
                        dataset: {
                            source: [
                                ['Movie', '第一部', '第二部', '第三部'],
                                ['复仇者联盟', 1518812988, 1402805868, 2048359754],
                                ['美国队长', 370569774, 714421503, 1153296293],
                                ['钢铁侠', 585366247, 623933331, 1214811252],
                                ['雷神', 449326618, 644783140, 853977126]
                            ]
                        },
                        xAxis: {type: 'category',axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff'   //这里用参数代替了
                                }
                            },},
                        yAxis: {gridIndex: 0,axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff'   //这里用参数代替了
                                }
                            },},
                        grid: {top: '55%'},
                        series: [
                            {name:'复仇者联盟',type: 'line', smooth: true, seriesLayoutBy: 'row'},
                            {name:'美国队长',type: 'line', smooth: true, seriesLayoutBy: 'row'},
                            {name:'钢铁侠',type: 'line', smooth: true, seriesLayoutBy: 'row'},
                            {name:'雷神',type: 'line', smooth: true, seriesLayoutBy: 'row'},
                            {
                                type: 'pie',
                                id: 'pie',
                                radius: '30%',
                                center: ['50%', '25%'],
                                label: {
                                    formatter: '{b}: {@第一部} ({d}%)'

                                },
                                encode: {
                                    itemName: 'Movie',
                                    value: '第一部',
                                    tooltip: '第一部'
                                }
                            }
                        ]
                    };

                    myChart.on('updateAxisPointer', function (event) {
                        var xAxisInfo = event.axesInfo[0];
                        if (xAxisInfo) {
                            var dimension = xAxisInfo.value + 1;
                            myChart.setOption({
                                series: {
                                    id: 'pie',
                                    label: {
                                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'

                                    },
                                    encode: {
                                        value: dimension,
                                        tooltip: dimension
                                    }
                                }
                            });
                        }
                    });

                    myChart.setOption(option);


            }
        }
    }
</script>

<style scoped>

</style>