<template>
    <el-form ref="form" :model="form" label-position = "top" size = small class = "form">
        <el-form-item label="取景地名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="取景地描述">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="电影情节描述">
            <el-input v-model="form.plot"></el-input>
        </el-form-item>
        <el-form-item label = "经纬度">
            <el-input v-model="form.posX" class = "span" placeholder = "经度"></el-input>
            <el-input v-model="form.posY" placeholder = "纬度"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="deleteItem">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "addLocation",
        data() {
            return {
                form: {
                    name: '',
                    description:'',
                    plot:'',
                    posX: '',
                    posY:''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$bus.$emit('addLocation', this.form)
                axios.post(
                    'http://106.52.187.27:8088/addData/addShootingLocation',
                    this.$qs.stringify(this.form)
                ).then(res => {
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                }).catch(err => {
                    this.$message({
                        message: '出了一点小问题，请稍后重试',
                        type: 'warning'
                    });
                })
            },
            deleteItem(){
                this.form.name = ''
                this.form.description = ''
                this.form.plot = ''
                this.form.posX = ''
                this.form.posY = ''
            }
        }
    }
</script>

<style scoped>
    /deep/.el-form-item{
        width: 70%;
        margin-left: 36px;

    }

    /deep/.el-input__inner{
        background-color: rgba(255,255,255,0.2);
        color: white;
    }
    /deep/.el-form-item__label{
        color: white;
    }

    .span{
        margin-bottom: 6px;
    }
</style>