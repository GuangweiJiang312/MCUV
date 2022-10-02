<template>
    <div class="tabControl" :style="{height: height+'px',width: width+'px'}">
      <div v-for="(item,index) in tabItem" class="item" :class="{active:index === currentIndex}" @click="itemClick(index)">
        <div>{{item}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tabControl",
        props:{
            tabItem:{
                type:Array,
                default(){
                    return []
                }
            },
            height:Number,
            width:Number
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex=index
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
  .tabControl{
    display: flex;
    text-align: center;
    font-size: 14px;
    /*height: 30px;*/
    line-height: 30px;
    font-weight: lighter;
    color: #bbb;
    /*width: 200px;*/
  }

  .item{
    flex: 1;
  }


  .active{
    color: #0195f3;
  }

  .active div{
    border-bottom:#0195f3 solid 1px;
  }

   .item div{
       cursor: pointer;
    }
</style>
