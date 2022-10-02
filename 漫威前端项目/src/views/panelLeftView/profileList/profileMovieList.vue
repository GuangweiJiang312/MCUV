<template>
    <div>
        <div class="title">Movie</div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class = "checkAll">全选</el-checkbox>
        <scroll class="scroll" :roll-height=465>
            <el-checkbox-group v-model=checkList v-for="item in movie" slot="content" @change="movieChange" class = "content">
                <span><el-checkbox :label="item">{{item}}</el-checkbox></span>
            </el-checkbox-group>
        </scroll>
    </div>
</template>

<script>
    import scroll from "components/common/scroll/scroll";

    export default {
        name: "profileMovieList",
        data(){
            return{
                movie:['美国队长1','美国队长2','美国队长3','复仇者联盟1','复仇者联盟2','复仇者联盟3','复仇者联盟4','钢铁侠1','钢铁侠2','钢铁侠3','绿巨人','雷神3','蚁人1',
                    '蚁人2','奇异博士','黑豹','惊奇队长','蜘蛛侠：英雄归来','蜘蛛侠：英雄远征'],
                checkList:[],
                isIndeterminate: true,
                checkAll: false,
            }
        },
        components:{
            scroll
        },
        created() {
        },
        methods:{
            movieChange(value){
                this.$bus.$emit('movieClick',this.checkList)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.movie.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.movie.length;
            },
            handleCheckAllChange(val) {
                this.checkList = val ? this.movie : [];
                this.isIndeterminate = false;
                this.$bus.$emit('movieClick',this.checkList)
            },
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

    .content{
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        cursor: pointer;
        margin-left: 16px;
        margin-right: 16px;
    }

    .content span{
        margin-left: 44px;
    }

    .content:hover{
        background-color: rgba(255,255,255,0.2);
    }

    /deep/.el-checkbox{
        color: white;
    }

    .checkAll{
        margin-left: 60px;
    }
</style>