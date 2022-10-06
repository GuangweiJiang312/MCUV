<template>
    <div>
        <el-table
                :data="tableData"
                height="650"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="事件名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="事件描述"
                    width="500">
            </el-table-column>
            <el-table-column
                    prop="positionX"
                    label="经度">
            </el-table-column>
            <el-table-column
                    prop="positionY"
                    label="纬度">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClickY(scope.row,scope.$index, tableData)" type="text" size="small">通过</el-button>
                    <el-button type="text" size="small" @click="handleClickN(scope.row,scope.$index, tableData)">未通过</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "incident",
        data(){
            return{
                tableData:[]
            }

        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                axios({
                    url:'http://106.52.187.27:8088/api/incident?enable_flag=N'
                }).then(res => {
                    // console.log(res);
                    this.tableData = res.data;
                })
            },
            handleClickY(row,index, rows) {
                console.log(row._id);
                axios.get('http://106.52.187.27:8088/api/IncidentChange',{
                    params:{
                        '_id':row._id,
                        'enable_flag':'Y'
                    }
                }).then(res => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
                rows.splice(index, 1);
            },
            handleClickN(row,index, rows) {
                axios.get('http://106.52.187.27:8088/api/IncidentChange',{
                    params:{
                        '_id':row._id,
                        'enable_flag':'D'
                    }
                }).then(res => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
                rows.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
/deep/.el-table__header{
    height: 40px;
    line-height: 40px;
}
</style>