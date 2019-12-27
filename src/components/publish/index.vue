<template>
       <!-- <el-card> -->
            <div  class="bigBox">
                    <div v-for="(item , index) in img" :key=index @click="dialogVisible"  class="box">
                          <img :src="item ? item : defaultImg" alt="" >
                    </div>
                    <!-- Dialog 对话框 -->
                   <el-dialog  :visible='visBool' @close='DialogClose'>
                      <!-- 在定义一个组件 -->
                        <cover-show></cover-show>
                   </el-dialog>
        </div>
       <!-- </el-card> -->
</template>

<script>
export default {
  props: ['img'],
  data () {
    return {
      defaultImg: '../../assets/pic_bg.png',
      visBool: false
    }
  },
  methods: {
    dialogVisible () {
      this.visBool = true
    },
    DialogClose () {
      this.visBool = false
    }
  }
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
                img{
                    width: 100%;
                    height: 100%;
                }
               }
    }
</style>
