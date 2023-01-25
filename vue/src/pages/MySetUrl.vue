<template>
  <div>
    <div class="tips_box">
        <div class="title">温馨提示</div>
        <h2>请先输入您后台的地址</h2>
        <span>请确保地址的正确性否则会影响程序的正常使用</span>
        <div class="input_box">
          <div>URL：</div><input v-model="httpUrl" type="text">
          <span v-if="showErr" class="tips">你输入的url格式错误</span>
        </div>
        <div class="btn_box">
          <button @click="setHttpURL">确认</button>
          <button @click="cancle">取消</button>
        </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { appWindow } from '@tauri-apps/api/window'
const httpUrl=ref('')

const router=useRouter()

const showErr=ref(false)

function setHttpURL(){
  const ver = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
  if(ver.test(httpUrl.value)){
    showErr.value=false
    localStorage.setItem('URL',httpUrl.value)
    router.push('/home/content')
  }else{
    showErr.value=true
    httpUrl.value=''
  }
}

function cancle(){
  appWindow.close()
}

</script>

<style scoped lang='scss'>
    .tips_box{
      margin: auto;
      margin-top: 100px;
      width: 300px;
      height: 200px;
      background-color: #dd4f62;
      text-align: center;
      .title{
        font-weight: bold;
        color: white;
      }
      h2{
        line-height: 25px;
        margin: 5px 0;
        padding: 0;
        color: white;
      }
      span{
        font-size: 10px;
        color: #e6e6e6;
      }
      .input_box{
        display: flex;
        justify-content: center;
        color: white;
        margin: 10px 0;
        align-items: center;
        position: relative;
        input{
          width:200px;
          border: none;
          outline: none;
          padding: 5px;
          color: #dd4f62;
        }
        .tips{
          position: absolute;
          left: 70px;
          top: 25px;
        }
      }

      .btn_box{
        margin-top: 20px;
        button{
          width: 100px;
          height: 30px;
          cursor: pointer;
          &:nth-child(1){
            margin-right: 20px;
            background-color: #dd4f62;
            border: 1px solid white;
            font-weight: bold;
            color: white;
            border-radius: 3px;
          }
          &:nth-child(2){
            border: none;
            background-color: white;
            border-radius: 3px;
            font-weight: bold;
            color: #dd4f62;
          }
        }
      }
    }
</style>