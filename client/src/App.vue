<template>
  <div class="container">
    <Card class="card" :bordered="false">
      <div style="text-align:center">
          <img style="max-width:100px;max-height:100px;" src="./assets/qqq.jpg" title="帅">
      </div>
    </Card>
    <Tabs class="main" value="sorry"  >
      <TabPane label="为所欲为" name="sorry">
        <div class="form-wrapper">
          <Form class="form"   label-position="top">
            <FormItem label="第一句">
              <Input v-model="sorry[0]"></Input>
            </FormItem>
            <FormItem label="第二句">
              <Input v-model="sorry[1]"></Input>
            </FormItem>
            <FormItem label="第三句">
              <Input v-model="sorry[2]"></Input>
            </FormItem>
            <FormItem label="第四句">
              <Input v-model="sorry[3]"></Input>
            </FormItem>
            <FormItem label="第五句">
              <Input v-model="sorry[4]"></Input>
            </FormItem>
            <FormItem label="第六句">
              <Input v-model="sorry[5]"></Input>
            </FormItem>
            <FormItem label="第七句">
              <Input v-model="sorry[6]"></Input>
            </FormItem>
            <FormItem label="第八句">
              <Input v-model="sorry[7]"></Input>
            </FormItem>
            <FormItem label="第九句">
              <Input v-model="sorry[8]"></Input>
            </FormItem>
          </Form>
          <div class="img">
            <img :src="prevImg.sorry" @load="loadComplete" alt="">
            <p>图片1分钟后会自动删除，请尽快保存</p>
            <Spin class="spin" fix v-if="loading"  size="large"></Spin>
          </div>
        </div>
        <Button type="primary" :loading="loading" long @click="toUpload(sorry, 'sorry')">
            <span v-if="!loading">生成</span>
            <span v-else>生成中...</span>
        </Button>
      </TabPane>
      <TabPane label="王境泽" name="wangjingze">
        <div class="form-wrapper">
          <Form class="form"   label-position="top">
            <FormItem label="第一句">
              <Input v-model="wangjingze[0]"></Input>
            </FormItem>
            <FormItem label="第二句">
              <Input v-model="wangjingze[1]"></Input>
            </FormItem>
            <FormItem label="第三句">
              <Input v-model="wangjingze[2]"></Input>
            </FormItem>
            <FormItem label="第四句">
              <Input v-model="wangjingze[3]"></Input>
            </FormItem>
          </Form>
          <div class="img">
            <img :src="prevImg.wangjingze" @load="loadComplete" alt="">
            <p>图片1分钟后会自动删除，请尽快保存</p>
            <Spin class="spin" fix v-if="loading"  size="large"></Spin>
          </div>
        </div>
        <Button type="primary" :loading="loading" long @click="toUpload(wangjingze, 'wangjingze')">
            <span v-if="!loading">生成</span>
            <span v-else>生成中...</span>
        </Button>
      </TabPane>
      <TabPane label="不打工" name="budagong">
        <div class="form-wrapper">
          <Form class="form"  label-position="top">
            <FormItem label="第一句">
              <Input v-model="budagong[0]"></Input>
            </FormItem>
            <FormItem label="第二句">
              <Input v-model="budagong[1]"></Input>
            </FormItem>
            <FormItem label="第三句">
              <Input v-model="budagong[2]"></Input>
            </FormItem>
            <FormItem label="第四句">
              <Input v-model="budagong[3]"></Input>
            </FormItem>
            <FormItem label="第五句">
              <Input v-model="budagong[4]"></Input>
            </FormItem>
          </Form>
          <div class="img">
            <img :src="prevImg.budagong" @load="loadComplete" alt="">
            <p>图片1分钟后会自动删除，请尽快保存</p>
            <Spin class="spin" fix v-if="loading"  size="large"></Spin>
          </div>
        </div>
        <Button type="primary" :loading="loading" long @click="toUpload(budagong, 'budagong')">
            <span v-if="!loading">生成</span>
            <span v-else>生成中...</span>
        </Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Button,
  Spin,
  Card
} from 'iview'
import axios from 'axios'
import sorryImg from './assets/sorry.png'
import wangjingzeImg from './assets/wangjingze.png'
import budagongImg from './assets/budagong.png'
export default {
  data: function() {
    return {
      sorry: [
        '好啊',
        '就算你是一流工程师',
        '就算你出报告再完美',
        '我叫你改报告你就要改',
        '毕竟我是客户',
        '客户了不起啊',
        'sorry 客户真的了不起',
        '以后叫他天天改报告',
        '天天改 天天改'
      ],
      wangjingze: [
        '我就是饿死',
        '死外边 从这跳下去',
        '也不会吃你们一点东西',
        '真香'
      ],
      budagong: [
        '没有钱啊 肯定要做的啊',
        '不做的话没有钱用',
        '有手有脚',
        '打工是不可能打工的',
        '这辈子不可能打工的'
      ],
      loading: false,
      prevImg: {
        sorry: sorryImg,
        wangjingze: wangjingzeImg,
        budagong: budagongImg
      }
    }
  },
  methods: {
    toUpload(data, type) {
      let obj = {
        type: type,
        data: data
      }
      this.loading = true
      axios.post('/postSen', obj)
        .then((res) => {
          let url = res.data
          this.prevImg[type] = url
        })
    },
    loadComplete() {
      this.loading = false
    }
  },
  components: {
    Tabs,
    TabPane,
    Form,
    FormItem,
    Input,
    Button,
    Spin,
    Card
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.container
  padding 15px
  .card
    width 100%
    margin auto
    img
      border 1px solid #ccc
      border-radius 50%
  .main
    max-width 1280px
    margin auto
    .ivu-tabs-bar
      border 1px solid #dddee1
      .ivu-tabs-nav
        width 100%
        display flex
      .ivu-tabs-nav .ivu-tabs-tab
        flex 1
        text-align center
    .form-wrapper
      display flex
      .form
        flex 1
      .img
        position relative
        flex 1
        text-align center
        height fit-content
        margin-left 10px
        img
          width 100%
</style>
