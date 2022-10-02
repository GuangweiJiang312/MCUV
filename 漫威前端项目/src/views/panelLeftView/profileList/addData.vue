<template>
    <div>
        <div class="title">Add Data</div>
        <el-select v-model="chooseItem" placeholder="请选择" size = small class = 'select'>
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <scroll class="scroll" :roll-height=438>
            <span class = "line" slot="rollTitle"></span>
            <div slot="content">
                <addIncident v-show="chooseItem == 1"></addIncident>
                <addPoint v-show="chooseItem == 2"></addPoint>
                <addLocation v-show="chooseItem == 3"></addLocation>
            </div>

        </scroll>

    </div>
</template>

<script>
    import scroll from "components/common/scroll/scroll";
    import addIncident from "./addData/addIncident";
    import addPoint from "./addData/addPoint";
    import addLocation from "./addData/addLocation";

    export default {
        name: "addData",
        components:{
            scroll,
            addIncident,
            addPoint,
            addLocation
        },
        data() {
            return {
                options:
                    [{
                    value: 1,
                    label: '添加事件数据'
                    },
                    {
                    value: 2,
                    label: '添加轨迹点数据'
                    },
                    {
                    value: 3,
                    label: '添加取景地数据'
                    }],
                chooseItem:''
            }
        },
        computed:{
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .select{
        margin-left: 36px;
    }

    .line{
        display: block;
        width: 220px;
        height: 10px;
        border-bottom: white 1px solid;
        margin: 0 auto;
    }

    /deep/.el-input__inner{
        background-color: rgba(255,255,255,0.2);
        color: white;
    }
</style>