<template>
    <div class = "animated bounceIn" id="mapworld" style="width: 1800px;height:700px;top:30px;padding-left:50px;margin:0 auto"></div>
</template>

<script>
    import echarts from 'echarts';
    import 'echarts/dist/echarts.min.js';
    import img1 from "assets/img/钢铁侠.jpg"
    import img2 from "assets/img/绿巨人.jpg"
    import img3 from "assets/img/美国队长.jpg"
    import img4 from "assets/img/蜘蛛侠.jpg"
    import img5 from "assets/img/雷神.jpg"
    import img6 from "assets/img/奇异博士.jpg"
    import img7 from "assets/img/黑豹.jpg"
    import img8 from "assets/img/黑寡妇.jpg"
    import img9 from "assets/img/黑寡妇.jpg"


    export default {
        name: "chart4",
        data() {
            return {
                img1:img1,
                img2:img2,
                img3:img3,
                img4:img4,
                img5:img5,
                img6:img6,
                img7:img7,
                img8:img8,
                img8:img8
            }
        },
        mounted(){
          this.SourseMap()
        },
        methods:{
            SourseMap(){
                    var weatherIcons = {
                        'p1': img1,
                        'p2': img2,
                        'p3': img3,
                        'p4': img4,
                        'p5': img5,
                        'p6': img6,
                        'p7': img7,
                        'p8': img8,
                        'p9': img9
                    };
                    var seriesLabel = {
                         normal: {
                            show: true,
                            textBorderColor: '#333',
                            textBorderWidth: 2
                            }
                    }

                    var chart = echarts.init(document.getElementById('mapworld'));
                    
                    chart.setOption({
                        title: {
                            text: '人气角色综合评测柱状图',
                            textStyle:{
                            color:'#F8F8FF'
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: ['人气值', '出场时长', '演员片酬'],
                            textStyle:{
                            color:'#F8F8FF'
                            }
                        },
                        grid: {
                            left: 100
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'value',
                            name: '数值',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle:{
                                    color:'#F8F8FF'
                                }
                            }
                        },
                        yAxis: {
                            type: 'category',
                            inverse: true,
                            data: ['钢铁侠', '绿巨人', '美国队长','蜘蛛侠','雷神','奇异博士','黑豹','黑寡妇','星爵'],
                            axisLabel: {
                                formatter: function (value) {
                                    return '{' + value + '| }\n{value|' + value + '}';
                                },
                                textStyle:{
                                    color:'#F8F8FF'
                                },
                                margin: 20,
                                rich: {
                                    value: {
                                        lineHeight: 30,
                                        align: 'center'
                                    },
                                    IronMan: {
                                        height: 10,
                                        align: 'center',
                                        
                                        backgroundColor: {
                                            image: weatherIcons.p1
                                        }
                                    
                                    },
                                    Hulk: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p2
                                        }
                                    },
                                    Captain: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p3
                                        }
                                    },
                                    SpiderMan: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p4
                                        }
                                    },
                                    Thor: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p5
                                        }
                                    },
                                    Doctor: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p6
                                        }
                                    },
                                    BlackPanther: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p7
                                        }
                                    },
                                    BlackWidow: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p8
                                        }
                                    },
                                    Star: {
                                        height: 10,
                                        align: 'center',
                                        backgroundColor: {
                                            image: weatherIcons.p9
                                        }
                                    }
                                }
                            }
                        },
                        series: [
                            {
                                name: '人气值',
                                type: 'bar',
                                data: [2175,1004,2153,2738,1535,990,1595,1178,1099],
                                label: seriesLabel,
                                
                            },
                            {
                                name: '出场时长',
                                type: 'bar',
                                label: seriesLabel,
                                data: [21360,8410,14340,9480,12120,5100,3180,6645,5640]
                            },
                            {
                                name: '演员片酬',
                                type: 'bar',
                                label: seriesLabel,
                                data: [5000,300,1500,350,1600,750,230,1400,500]
                            },
                    
                        ]
                    });
                    
            }
        }
    }
</script>

<style scoped>

</style>