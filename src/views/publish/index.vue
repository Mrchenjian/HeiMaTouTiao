<template>
   <el-card>
        <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
     <!-- 主体结构 -->
       <el-form   :model="formDate"   ref="myForm"  :rules="rules"    class="formarticle" style="margin-left:50px" label-width="100px">
           <el-form-item label='标题' prop="title">
               <el-input placeholder="文章名称"  v-model="formDate.title"  style="width:60%" ></el-input>
           </el-form-item>
            <el-form-item label="内容" prop="content">
               <quill-editor type="textarea" placeholder="请输入内容" :rows="2" style="height:200px;" v-model="formDate.content"  ></quill-editor>
           </el-form-item>
           <el-form-item label="封面" style="margin-top:100px">
                <el-radio-group  @change='radioGroup' v-model="formDate.cover.type" >
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
           </el-form-item>
           <!-- 封面功能设计 -->
           <el-form-item>
               <Upload  :img='formDate.cover.images'>

               </Upload>
           </el-form-item>
           <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formDate.channel_id"  placeholder="请选择">
                    <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
           </el-form-item>
           <el-form-item>
                    <el-button type="primary" @click="login(false)">发表</el-button>
                    <el-button @click="login(true)">存入草稿</el-button>
           </el-form-item>
       </el-form>
   </el-card>
</template>

<script>

export default {

  data () {
    return {
      channels: [], // 定义一个channels 接收频道
      formDate: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null

      },
      //  定义验证规则
      rules: {
        title: [{ required: true, message: '请输入活动名称' }
        //   { min: 3, max: 5, message: '长度在3到5个字符' }
        ],
        content: [{ required: true, message: '文章内容不能为空' }
        ],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  methods: {
    // 检测radio-group 数据的变化
    radioGroup () {
      if (this.formDate.cover.type === 0 || this.formDate.cover.type === -1) {
        this.formDate.cover.images = []
      } else if (this.formDate.cover.type === 1) {
        this.formDate.cover.images = ['']
      } else if (this.formDate.cover.type === 3) {
        this.formDate.cover.images = ['', '', '']
      }
    },
    //   获取文章详情通过id
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.formDate = result.data // 将指定文章数据给data数据
      })
    },
    //   获取频道的数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    login (draft) {
    //   let draft = true
      this.$refs.myForm.validate((isok) => {
        if (isok) {
          let { id } = this.$route.params // 获取动态路由参数 id 已是字符串那
          this.$axios({
            url: id ? `/articles/${id}` : `/articles`,
            method: id ? 'put' : 'post',
            params: { draft }, // query参数
            data: this.formDate
          }).then(() => {
            // 新增成功 => 应该去内容列表
            this.$router.push('/home/articles') // 回到内容列表
          })
        }
      })
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        //  有参数  => 修改
        // this.login()
      } else {
        // 没有参数  => 发布 // 没有参数  => 发布
        this.formDate = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          }
        }
      }
    }// 检测 type 的变化
  //   'formDate.cover.type': function () {
  //     if (this.formDate.cover.type === 0 || this.formDate.cover.type === -1) {
  //       this.formDate.cover.images = []
  //     } else if (this.formDate.cover.type === 1) {
  //       this.formDate.cover.images = ['']
  //     } else if (this.formDate.cover.type === 3) {
  //       this.formDate.cover.images = ['', '', '']
  //     }
  //   }
  },
  created () {
    this.getChannels() // 获取频道数据
    let { id } = this.$route.params // 获取动态路由参数
    id && this.getArticleById(id)
  }
}
</script >

<style  land='less' scopted>
        .formarticle{
            text-align: left;
        }
</style>
