<template>
  <div data-tauri-drag-region class="titlebar">
  <div class="theme">
    <div class="title">主题</div>
    <div class="switch" @click="switchClick" :class="switchFlag?'switchmove':''">
      <div class="circle"></div>
    </div>
  </div>
  <div @click="windowminimize" class="titlebar-button" id="titlebar-minimize">
    <img
      class="min"
      src="../assets/2zuixiaohua-2.svg"
      alt="minimize"
    />
  </div>
  <div @click="windowmaximize" class="titlebar-button" id="titlebar-maximize">
    <img
      class="max"
      src="../assets/zuidahua.svg"
      alt="maximize"
    />
  </div>
  <div @click="windowclose" class="titlebar-button" id="titlebar-close">
    <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
  </div>
</div>
</template>

<script setup lang='ts'>
import { appWindow } from '@tauri-apps/api/window'
import { ref } from 'vue'

const emit=defineEmits(['switch'])

const switchFlag=ref(false)

function switchClick(){
  switchFlag.value=!switchFlag.value
  emit('switch',switchFlag.value?'pink':'light')
}

function windowminimize() {
  appWindow.minimize()
}

function windowmaximize(){
  appWindow.toggleMaximize()
}

function windowclose(){
  appWindow.close()
}

</script>

<style scoped lang='scss'>
.titlebar {
  background-color: var(--navColor);  
  z-index: 0;
  height: 40px;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  .theme{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    .title{
      width: 35px;
    }
    .switch{
      cursor: pointer;
      border: 2px solid var(--fontColor);
      width: 40px;
      height: 18px;
      margin-right: 40px;
      border-radius: 50px;
      position: relative;
      padding: 2px;
      .circle{
        position: absolute;
        left: 1px;
        top:1px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--fontColor);
      }
    }
    .switchmove{
      border: 2px solid #fff;
      .circle{
        left: 22px;
        background-color: #fff;
      }
    }
  }
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;
  font-size: 12px;
  .max{
    &:hover{
      position: relative;
      left: -80px;
      filter: drop-shadow(var(--fontColor) 80px 0);
    }
  }
  .min{
    &:hover{
      position: relative;
      left: -80px;
      filter: drop-shadow(var(--fontColor) 80px 0);
    }
  }
}
</style>