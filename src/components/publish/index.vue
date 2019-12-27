<template>
       <!-- <el-card> -->

            <div  class="bigBox">
                    <div v-for="(item , index) in img" :key=index @click="dialogVisible(index)"  class="box">
                          <img :src="item ? item : defaultImg" alt="" >
                    </div>
                    <!-- Dialog 对话框 -->
                   <el-dialog  :visible='visBool' @close='DialogClose'>
                      <!-- 在定义一个组件  选择素材组件 -->
                        <cover-show @coverimage='receveImg'></cover-show>
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
      visBool: false,
      selectIndex: -1 // 默认下标-1
    }
  },
  methods: {
    receveImg (img) {
      alert('接收地址' + img)
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发一个自定义事件
      this.DialogClose()
    },
    dialogVisible (index) { // 显示弹框
      this.selectIndex = index // 记住点击的下标
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
