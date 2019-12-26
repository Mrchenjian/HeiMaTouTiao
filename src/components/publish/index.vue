<template>
       <!-- <el-card> -->
            <div  class="bigBox">
                    <div v-for="(item , index) in img" :key=index  class="box">
                          <img src="../../assets/pic_bg.png" alt="">
                    </div>
        </div>
       <!-- </el-card> -->
</template>

<script>
export default {
  props: ['img']
}
</script>

<style lang='less' scopted>
    .bigBox{
            display:  flex;
             padding: 10px;
               .box{
                width: 250px;
                height: 250px;
                border: 1px solid #ccc;
                .img{
                    width: 100%;
                    height: 100%;
                }
               }
    }
</style>
