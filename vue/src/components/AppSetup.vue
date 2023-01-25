<template>
  <div class="setup">
        <h2>重置URL</h2>
        <div>
            <div class="current">当前url：{{currentUrl}}</div>
            <div class="input_box">
                <div class="tips">请您在下方输入新的url地址,确认后自动关闭请重新打开</div>
                <input v-model="httpUrl" type="text">
                <span v-if="showErr">当前url的格式有误</span>
                <div class="btn">
                    <button @click="setNewUrl">确认</button>
                    <button @click="cencel">取消</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { appWindow } from '@tauri-apps/api/window'

const showErr=ref(false)


const emit=defineEmits(['hideSetup'])

const httpUrl=ref('')

const currentUrl=ref(localStorage.getItem('URL'))

function cencel(){
  emit('hideSetup')
}

function setNewUrl(){
  const ver = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
  if(ver.test(httpUrl.value)){
    showErr.value=false
    localStorage.setItem('URL',httpUrl.value)
    appWindow.close()
  }else{
    showErr.value=true
    httpUrl.value=''
  }
}

</script>

<style scoped lang='scss'>
  .setup{
    position: fixed;
    left: 50%;
    top: 150px;
    background-color: var(--fontColor);
    width: 300px;
    transform: translateX(-50%);
    text-align: center;
    height: 220px;
    color: var(--navColor);
    h2{
        margin: 5px 0;
        font-size: 20px;
    }
    .current{
        font-weight: bold;
        font-size: 12px;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
    }
    .input_box{
        position: relative;
        .tips{
            margin: 10px 0;
            font-size: 14px;
        }
        input{
            padding: 5px;
            width: 200px;
            outline: none;
            color: var(--fontColor);
            border: none;
            background-color: var(--navColor);
            border-radius: 3px;
        }

        span{
            font-size: 7px;
            position: absolute;
            left: 45px;
            top: 58px;
        }
        .btn{
            margin-top: 30px;
            button{
                width: 100px;
                height: 30px;
                border: none;
                font-weight: bold;
                border-radius: 2px;
                &:nth-child(1){
                    margin-right: 20px;
                    color: var(--navColor);
                    border: 1px solid var(--navColor);
                    background-color: var(--fontColor);
                }
                &:nth-child(2){
                    color: var(--fontColor);
                    background-color: var(--navColor);
                }
            }
        }
    }
  }
</style>