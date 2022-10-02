<template>
    <div class="profileItem">
        <img :src="imgHeadUrl" class="profileItemImg">
        <span class="profileItemName">{{name}}</span>
    </div>
</template>

<script>
    export default {
        name: "profileCharItem",
        props:{
            id:String,
            name:String
        },
        computed:{
            imgHeadUrl(){
                return 'http://106.52.187.27:8088/marvel_svg/'+this.id+'.svg'
            }
        },
        methods:{
            charClick(){
                this.$bus.$emit('charClick',this.id)
            }
        }
    }
</script>

<style scoped>
.profileItem{
    display: flex;
    height: 34px;
    margin-top: 10px;
    margin-left: 16px;
    margin-right: 16px;
    cursor: pointer;
}

.profileItem:hover{
    background-color: rgba(255,255,255,0.2);
}
    .profileItemImg{
        display: block;
        width: 30px;
        margin-right: 20px;
        margin-left: 14px;
    }
    .profileItemName{
        line-height: 34px;
        font-size: 16px;
    }
</style>