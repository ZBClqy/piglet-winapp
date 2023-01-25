<template>
  <div class="content_box">
    <template v-for="(item,index) in viewList" :key="index">
      <div class="content_item" @click="viewWin(item.name,item.view,item.type)">
          <img :src="httpurl+'/'+item.img"  alt="">
          <h2>{{item.name}}</h2>
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import * as API from '../api'
import { reactive,watch,ref } from 'vue'
import { useRoute } from 'vue-router'
import { WebviewWindow } from '@tauri-apps/api/window'

type data_type={name:string,img:string,view:string,type:string}

const viewList:data_type[]=reactive([])

const route=useRoute()

const win=ref()

const httpurl=ref(localStorage.getItem('URL'))

watch(()=>route.query,()=>{
  getFiles()
},{deep:true})

async function viewWin(title:string,view:string,type:string){
  console.log(`/view?title=${title}&view=${view}&type=${type}`)
  if(win.value){
    try{
      await win.value.close()
    }catch(err){/** */}
  }
  win.value= new WebviewWindow('view',{
    'url':`/view?title=${title}&view=${view}&type=${type}&nav=${route.query.nav}`,
    'fileDropEnabled':true,
    'fullscreen': false,
    'height': 600,
    'resizable': true,
    'title': 'playerapp',
    'width': 1000,
    'center':true,
    'x':0,
    'y':0,
    'decorations':false,
    'theme':'dark'
  })
  
}

async function getFiles(){
  try{
    viewList.splice(0,viewList.length)
    let response=await API.getViewInfo(route.query.nav as string)
    viewList.push(...response?.data)
  }catch(error){/** */}
}

getFiles()

</script>

<style scoped lang='scss'>
    .content_box{
        width: 100%;
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        .content_item{
            height: 250px;
            width: 170px;
            background-color: var(--fontColor);
            margin: 10px;
            cursor: pointer;
            img{
              width: 170px;
              height: 170px;
              object-fit:cover;
            }
            h2{
              font-size: 14px;
              color: var(--navColor);
              text-align: center;
            }
        }
    }
</style>