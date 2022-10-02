<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="middle"><slot name="middle"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "navBar"
    }
</script>

<style scoped>
    .nav-bar{
        display: flex;
        height: 50px;
        text-align: center;
        line-height: 50px;
    }

    .right ,.left{
        width: 60px;
    }

    .middle{
        flex: 1;
    }

    .middle{
        text-align: left;
    }
</style>