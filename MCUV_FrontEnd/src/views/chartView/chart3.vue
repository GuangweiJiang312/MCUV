<template>
    <div id="main" style="width: 1500px;height:600px;margin:0 auto" class = "animated bounceIn"></div>
</template>

<script>
    import echarts from 'echarts'
    import migration_index from 'assets/json/migration_index.json'
    import time_index from 'assets/json/time_index.json'

    export default {
        name: "chart3",
        mounted() {
            var testChart=echarts.init(document.getElementById('main'))
            var move_index=[]
            for (var i=0;i<migration_index.length;i++) {
                let tempList=[]
                for (var j=0;j<migration_index[i]['data'].length;j++) {
                    tempList.push(migration_index[i]['data'][j]['move_index'])
                }
                move_index.push(tempList)
            }
            console.log(move_index[0])
            console.log(time_index)
            var option = {
                title: {
                    text: '迁徙指数',
                    padding:[10,20,10,75],
                    textStyle:{
                        color:'#F8F8FF'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['美国队长', '钢铁侠', '绿巨人', '黑寡妇', '蜘蛛侠','惊奇队长','黑豹','奇异博士','蚁人'],
                    top:25,
                    textStyle:{
                        color:'#F8F8FF'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: time_index,
                    axisLabel:{
                        show:true,
                        textStyle:{
                            color:'#F8F8FF'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel:{
                        textStyle:{
                            color:'#F8F8FF'
                        }
                    }
                },
                series: [
                    {
                        name: '美国队长',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[0]
                    },
                    {
                        name: '钢铁侠',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[1]
                    },
                    {
                        name: '绿巨人',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[2]
                    },
                    {
                        name: '黑寡妇',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[3]
                    },
                    {
                        name: '蜘蛛侠',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[4]
                    },
                    {
                        name: '惊奇队长',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[5]
                    },
                    {
                        name: '黑豹',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[6]
                    },
                    {
                        name: '奇异博士',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[7]
                    },
                    {
                        name: '蚁人',
                        type: 'line',
                        //stack: '总量',
                        data: move_index[8]
                    },
                ]
            };
            
            testChart.setOption(option)
        }
    }
</script>

<style scoped>

</style>