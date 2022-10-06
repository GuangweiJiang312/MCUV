<template>
    <div class="frame">
        <el-row>
            <el-col :span="24"><div class="grid-content head">
                <slot name = "navHead"></slot>
            </div></el-col>
        </el-row>
        <el-row  :gutter = 6>
            <el-col :span="24"><div class="grid-content">
                <slot name = "bodyMain"></slot>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "mainFrame"
    }
</script>

<style scoped>
    .frame{
        margin-top: 10px;
        margin-left: 6px;
        margin-right: 6px;
    }

    .el-row {
        margin-bottom: 20px;
        /*margin-top: 10px;*/
    }
    .grid-content {
        min-height: 36px;
        background-color: #131d27;
    }
</style>