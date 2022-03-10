<template>
  <div class="app" ref="app">
    <div class="container">
      <a>按钮</a>
      <el-button type="primary" @click="handleClick('test')">测1试</el-button>
      <el-button type="primary" @click="handleClick('test')">测2试</el-button>
    </div>
    <div class="container">
      <a>开关</a>
      <el-switch
      @change="toggle"
        v-model="status"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <div class="container">
      <a>列表</a>
      <el-button class="btn" type="primary" @click="handleClick('getList')">获取</el-button>
      <el-select v-model="value" placeholder="请选择" @change="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="container">
      <a>图像</a>
      <el-button class="btn" type="primary" @click="openImage()">打开</el-button>
      <img style="width:320px;height:240px" ref="image"/>
    </div>
  </div>
</template>

<script>

import { Message } from './message'

export default {

  name: 'app',
  data(){

    return{
      status: false,
      options:[],
      value: ''
    }

  },
  methods:{

    handleClick(action){

      var message = new Message()
      message.args['action'] = action
      this.$socket.emit('message', JSON.stringify(message))

    },

    openImage(){

      var message = new Message()
      message.args['action'] = 'BI_OPEN_FILE'
      message.args['id'] = 'image0'
      this.$socket.emit('message', JSON.stringify(message))

      console.log(JSON.stringify(message))

    },

    toggle(value){

      var message = new Message()
      message.args['action'] = 'toggle'
      message.args['value'] = value
      this.$socket.emit('message', JSON.stringify(message))

    },

    select(value){

      var message = new Message()
      message.args['action'] = 'selectList'
      message.args['value'] = value
      this.$socket.emit('message', JSON.stringify(message))

    }

  },
  // https://segmentfault.com/q/1010000021209820?utm_source=tag-newest
  sockets: {

    // 连接
    connect () {

      console.log('connect')
      this.$socket.emit('message', JSON.stringify(new Message()))

    },

    // 断开
    disconnect () {

      console.log('disconnect')

    },

    // 消息接收
    message (data) {

      console.log(data)
      const action = data.action
      switch(action){
        case "getList":
          this.options = []
          if(data.value != undefined){
            data.value.forEach( (key, index) => {
              this.options.push({
                value: key,
                label: key
              })
            })
            this.value = this.options[0].value
          }
          break
        case 'shutDown':
          alert('Message From C++ Template : Shut Down ' + (data.action ? 'Success' : 'Failed'))
          break
        case "showImage":
          this.$refs['image'].src = 'data:image/jpeg;base64,' +  data.data
          break
        default:
          break
      }

    },

    // 插件框架中工作区宽高改变事件
    onResize(data){

      const style = this.$refs['app'].style
      style.width = data.width + 'px'
      style.height = data.height + 'px'

    }

  },
}
</script>

<style lang="sass">
  @import './App.scss'
</style>
