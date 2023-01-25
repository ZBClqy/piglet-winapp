<template>
  <div class="view_box">
    <header v-if="!isFullScreen">
      <MyHeader></MyHeader>
    </header>
    <div ref="mainbox" class="main">
      <div class="left_view">
        <MyView ref="myvideo" :viewQuery="currentPlayback" :rightDistance="right" @fullScreen="switchHeadNav" @nextView="nextView"></MyView>
      </div>
      <div v-if="!isFullScreen" ref="sidebar" class="right_box">
        <div class="title">选择视频</div>
        <div class="slide">
          <div @click="switchSidebar('right')" v-if="isSidebar" class="arrow_box">
            <img src="../../assets/right.svg" alt="">
          </div>
          <div @click="switchSidebar('left')" v-else class="arrow_box_right">
            <img src="../../assets/left.svg" alt="">
          </div>
        </div>
        <div class="video_list">
          <div class="video_item" v-if="route.query.type==='dy'">
            <div class="choice_video select_video" >
              <div>正在播放：{{ route.query.title }}</div>
            </div>
            <div class="select_video">...</div>
            <div class="video_animation">
              <div class="squary_one"></div>
              <div class="squary_two"></div>
              <div class="squary_three"></div>
            </div>
          </div>
          <div v-else>
            <template v-for="(item,index) in viewListData" :key="index">
              <div class="video_item" @click="switchView(index,item)">
                    <div class="choice_video" :class="index===showIndex?'select_video':''">
                      <span v-if="index===showIndex">正在播放：</span>{{item}}
                    </div>
                    <div :class="index===showIndex?'select_video':''" v-if="item.length>20">...</div>
                    <div v-if="index===showIndex" class="video_animation">
                      <div class="squary_one"></div>
                      <div class="squary_two"></div>
                      <div class="squary_three"></div>
                    </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import MyHeader from './components/MyViewHead.vue'
import MyView from './components/MyViewCom.vue'
import { useRoute } from 'vue-router'
import { ref,reactive } from 'vue'
import * as API from '../../api'

const route=useRoute()

const isSidebar=ref(true)

const sidebar=ref(null)

const mainbox=ref(null)

const right=ref('31vw')

const isFullScreen=ref(false)

const viewListData:string[]=reactive([])

const showIndex=ref(0)

const currentPlayback=ref(route.query.view as string)

const myvideo=ref()

if(route.query.type=='lxj'){
  getViewListData()
}

async function getViewListData(){
  if(route.query.view){
    let arr=(route.query.view as string).split('/')
    console.log(arr)
    let str=(route.query.view as string).replace(arr[arr.length-1],'')
    let res=await API.getViewListData(str)
    viewListData.push(...res?.data.sort(function (a:string,b:string) {
      if(a.match(/\d+/g)&&b.match(/\d+/g)){
        let arr1= a.match(/\d+/g) as string[]
        let arr2= b.match(/\d+/ig) as string[]
        return Number(arr1[0]) - Number(arr2[0])
      }
    }))
  }
}

function nextView(){
  if(viewListData.length<=1){
    return
  }
  showIndex.value++
  currentPlayback.value=route.query.nav+'/'+route.query.title+'/'+viewListData[showIndex.value]
  myvideo.value.isPlay=false
}

function switchView(val:number,item:string){
  showIndex.value=val
  currentPlayback.value=route.query.nav+'/'+route.query.title+'/'+item
  myvideo.value.isPlay=false
}

function switchHeadNav(val:boolean){
  let main=mainbox.value as HTMLDivElement |null
  if(val){
    
    if(main?.className){
      main.className='main main_switch'
    }

    right.value='30px'
  }else{

    if(main?.className){
      main.className='main'
    }

    right.value='31vw'
  }

  isFullScreen.value=val
  isSidebar.value=true
}

function switchSidebar(val:string){
  let navbar=sidebar.value as HTMLDivElement |null
  if(val=='right'){
    isSidebar.value=false
    if(navbar?.className){
      navbar.className='right_box right_box_switch'
    }

    right.value='30px'
  }else if(val=='left'){
    isSidebar.value=true
    if(navbar?.className){
      navbar.className='right_box'
    }



    right.value='31vw'
  }

}

</script>

<style scoped lang='scss'>
  header{
    width: 100vw;
    overflow: hidden;
  }
  .main{
    background-color: black;
    width: 100vw;
    height: 100vh;
    padding-top: 50px;
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    .video_list{
      color: white;
      cursor: pointer;
      height: 85%;
      overflow-y:auto ;
      &::-webkit-scrollbar{
          width: 10px;
       }
       &::-webkit-scrollbar-track{
          background-color: transparent;
       }
       &::-webkit-scrollbar-thumb{
          border-radius: 20px;
          background-color: white;
       }
      .video_item{
        display: flex;
        align-items: center;
        justify-content: center;
        .choice_video{
          padding: 15px;
          font-size: 12px;
          word-wrap: normal;
          white-space: nowrap;
          overflow: hidden;
          position: relative;
          width: 200px;
        }
        .video_animation{
          margin-left: 5px;
          display: flex;
          position: relative;
          .squary_one{
            width: 3px;
            background-color: #dd4f62;
            transition: all 1s;
            height: 0px;
            animation: downupSquary 1.2s infinite linear;
            position: absolute;
            bottom: -5px;
            left: 3px;
          }
          .squary_two{
            margin: 0 2px;
            width: 3px;
            height: 0px;
            background-color: #dd4f62;
            transition: all 1s;
            animation: downupSquary 1.5s infinite linear;
            position: absolute;
            bottom: -5px;
            left: 8px;
          }
          .squary_three{
            width: 3px;
            background-color: #dd4f62;
            transition: all 1s;
            animation: downupSquary 1.9s infinite linear;
            position: absolute;
            height: 0px;
            bottom: -5px;
            left: 16px;
          }
        }
      }
    }

    .select_video{
        color: #dd4f62;
    }
    .left_view{
      flex: 1;
      width: 70vw;
    }
    .right_box{
      position: relative;
      top:-10px;
      width: 30vw;
      height: 100vh;
      background-color: rgb(36, 37, 38);
      .title{
        padding: 15px;
        color: #dd4f62;
        font-weight: bold;
        border-bottom:1px solid white ;
      }

      .arrow_box,.arrow_box_right{
        width: 30px;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 100;
      }

      .arrow_box_right{
        transform: translateY(-50%) translateX(-30px);
      }
    }

    .right_box_switch{
      position:absolute;
      right: -30vw;
      top: 40px;
    }
  }

  .main_switch{
    padding-top: 0px;
  }

  @keyframes downupSquary{
    50%{ 
      height: 15px;
      transition: height 1s;
    }
  }
</style>