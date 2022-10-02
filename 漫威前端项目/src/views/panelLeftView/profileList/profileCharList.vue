<template>
    <div>
        <div class="title">Character</div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
            <span class="checkAll">
                全选
            </span>
        </el-checkbox>
        <scroll class="scroll" :roll-height=465>
            <el-checkbox-group v-model="checkList"  slot="content" @change="charChange">
            <div v-for="item in character">
                <el-checkbox :label="item">
                    <profileCharItem :id="item.id" :name = "item.name"></profileCharItem>
                </el-checkbox>
            </div>
            </el-checkbox-group>
        </scroll>
    </div>
</template>

<script>
    import profileCharItem from "./profileCharItem";
    import scroll from "../../../components/common/scroll/scroll";

    export default {
        name: "profileCharList",
        data(){
            return{
                character:[
                    {"id": "stever", "name": "Captain America"},
                    {"id": "tonys", "name": "Iron Man"},
                    {"id": "bruceb", "name": "Hulk"},
                    {"id": "scottl", "name": "Ant Man"},
                    {"id": "stephens", "name": "Doctor Strange"},
                    {"id": "tchalla", "name": "Black Panther"},
                    {"id": "carold", "name": "Captain Marvel"},
                    {"id": "peterp", "name": "Spider Man"},
                    {"id": "blackw", "name": "Black Widow"}
                ],
                checkList:[],
                isIndeterminate: true,
                checkAll: false,
            }
        },
        components:{
            profileCharItem,
            scroll
        },
        created() {
        },
        methods:{
            handleCheckAllChange(val) {
                this.checkList = val ? this.character : [];
                this.isIndeterminate = false;
                this.$bus.$emit('charClick',this.checkList)
            },
            charChange(value){
                this.$bus.$emit('charClick',this.checkList)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.character.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.character.length;
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

    /deep/.el-checkbox{
        color: white;
    }

    /deep/.el-checkbox__input{
        display: none;
        /*position: relative;*/
        /*top: -16px;*/
        /*left: 30px;*/
    }
    .checkAll{
        margin-left: 36px;
        /*line-height: 20px;*/
    }

    .content:hover{
        background-color: rgba(255,255,255,0.2);
    }
</style>