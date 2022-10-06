<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-chat-line-square"></i>
                    <span>事件信息</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1"><i class="el-icon-refresh"></i>待审核</el-menu-item>
                    <el-menu-item index="1-2"><i class="el-icon-finished"></i>已通过</el-menu-item>
                    <el-menu-item index="1-3"><i class="el-icon-close"></i>未通过</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-place"></i>
                    <span>人物轨迹点</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1"><i class="el-icon-refresh"></i>待审核</el-menu-item>
                    <el-menu-item index="2-2"><i class="el-icon-finished"></i>已通过</el-menu-item>
                    <el-menu-item index="2-3"><i class="el-icon-close"></i>未通过</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-full-screen"></i>
                    <span>取景地信息</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1"><i class="el-icon-refresh"></i>待审核</el-menu-item>
                    <el-menu-item index="3-2"><i class="el-icon-finished"></i>已通过</el-menu-item>
                    <el-menu-item index="3-3"><i class="el-icon-close"></i>未通过</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "right",
        methods:{
            handleOpen(key, keyPath) {
                // console.log(key);
                switch (key) {
                    case '1':
                        this.$router.push('/incident')
                        break
                    case '2':
                        this.$router.push('/tracePoint')
                        break
                    case '3':
                        this.$router.push('/shootingLocation')
                        break
                }
            },
            handleClose(key, keyPath) {
            },
            handleSelect(key, keyPath) {
                switch (key) {
                    case '1-1':
                        this.$router.push('/incident')
                        break
                    case '1-2':
                        this.$router.push('/incidentY')
                        break
                    case '1-3':
                        this.$router.push('/incidentN')
                        break
                    case '2-1':
                        this.$router.push('/tracePoint')
                        break
                    case '2-2':
                        this.$router.push('/tracePointY')
                        break
                    case '2-3':
                        this.$router.push('/tracePointN')
                        break
                    case '3-1':
                        this.$router.push('/shootingLocation')
                        break
                    case '3-2':
                        this.$router.push('/shootingLocationY')
                        break
                    case '3-3':
                        this.$router.push('/shootingLocationN')
                        break
                }
            }
        }
    }
</script>

<style scoped>
    #div::-webkit-scrollbar{
        display: none;
    }

</style>