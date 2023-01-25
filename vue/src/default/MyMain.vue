<template>
    <div :class="theme">
       <header>
          <MyHeader @switch="switchTheme"></MyHeader>
       </header>
       <main>
          <nav>
             <MyNav @selectNav="selectNav" @showSetups="showSet"></MyNav>
          </nav>
          <div class="content">
             <router-view></router-view>
          </div>
          <transition name="tips">
            <MySetup @hideSetup="hideSet" v-if="showSetup"></MySetup>
         </transition>
       </main>
    </div>
 </template>
 
<script setup lang='ts'>
import MyHeader from '../components/AppHeader.vue'
import MyNav from '../components/AppNavBar.vue'
import MySetup from '../components/AppSetup.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
 
const theme=ref('light')
 
const router=useRouter()
 
const showSetup=ref(false)

function switchTheme(val:string){
  theme.value=val
}
 
function hideSet(){
  showSetup.value=false
}

function showSet(){
  showSetup.value=true 
}

async function selectNav(val:string){
  router.push({query:{nav:val}})
}
 
</script>
 
 <style  lang='scss'>
 .light{
    width: 100vw;
    height: 100vh;
    background-color:$defaultBackColor;
    color: $defaultFontColor;
    --fontColor:#db5a6b;
    --navColor:#eee;
    transition: background-color 1s,color 1s;
 }
 .pink{
    width: 100vw;
    height: 100vh;
    background-color:$pinkBackColor;
    color: $pinkFontColor;
    --fontColor:#fff;
    --navColor:#dd4f62;
    transition: background-color 1s,color 1s;
 }
 
 main{
    display: flex;
    width: 100vw;
    height: 100vh;
    .content{
       padding-top: 40px;
       width: 100%;
       height: 100vh;
       flex: 1;
       overflow-y: scroll;
       &::-webkit-scrollbar{
          width: 10px;
       }
       &::-webkit-scrollbar-track{
          background-color: transparent;
       }
       &::-webkit-scrollbar-thumb{
          border-radius: 20px;
          background-color: var(--fontColor);
       }
    }
 }

 .tips-enter-from{
   opacity: 0;
 }

 .tips-enter-to{
   opacity: 1;
 }

 .tips-enter-active{
   transition: all 1s;
 }


 </style>