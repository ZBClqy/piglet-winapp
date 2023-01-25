<template>
      <video @click="switchVideo" ref="myvideo" autoplay :src="httpurl+'/play?view='+viewQuery"></video>
      <div v-show="showControls" class="controls">
        <div v-show="showLine" ref="progress" class="progress_bar">
          <div class="time">{{ startTime }}</div>
          <div  class="line_box" @click="updateCurrentTime($event)">
            <div ref="videolineback" class="line_back"></div>
            <div ref="videocache" class="line_cache"></div>
            <div ref="videoline" class="line"></div>
          </div>
          <div class="time">{{ endTime }}</div>
        </div>
        <div @click="switchState('play')" v-if="isPlay" class="start">
      <img src="../../../assets/start.svg" alt="">
        </div>
        <div @click="switchState('pause')" v-else class="suspend">
      <img src="../../../assets/suspend.svg" alt="">
        </div>
        <div @click="next" class="next">
      <img src="../../../assets/next.svg" alt="">
        </div>
        <div class="right" :style="'right:'+rightDistance">
      <div  class="multiple" @mouseenter="showSelect=true" @mouseleave="showSelect=false">
        <div v-if="showSelect"  class="select_box">
            <div @click="selectMultiple('2.0')">2.0</div>
            <div @click="selectMultiple('1.5')">1.5</div>
            <div @click="selectMultiple('1.0')">1.0</div>
            <div @click="selectMultiple('0.5')">0.5</div>
        </div> 
        <div ref="buoy"  class="buoy">{{ multipleValue }}</div>
      </div>
      <div class="voice" @mouseenter="showVoice=true" @mouseleave="showVoice=false">
          <div></div>
          <div class="ico" @click="switchVoice()" >
            <div class="image">
              <img v-if="!isVoice" src="../../../assets/voice.svg" alt="">
              <img v-else src="../../../assets/downvoice.svg" alt="">
            </div>
          </div>
          <div v-show="showVoice" class="voice_progress">
              <div ref="lineBack" class="line_back">
                <div ref="line" class="line"></div>
              </div>
          </div>
      </div>
      <div @click="fullScreen" class="fullscreen">
        <img src="../../../assets/fullscreen.svg" alt="">
      </div>
        </div>
      </div>
</template>

<script setup lang='ts'>
import { ref,onMounted,watch,onBeforeUnmount } from 'vue'
import { appWindow } from '@tauri-apps/api/window'

const isPlay=ref(false)

const myvideo=ref()

const multipleValue=ref('倍数')

const buoy=ref(null)

const showSelect=ref(false)

const isVoice=ref(false)

const lineBack=ref()

const line=ref()

const showVoice=ref(false)

const progress=ref()

const startTime=ref('00:00:00')

const endTime=ref('00:00:00')

const videoline=ref()

const videolineback=ref()

const videocache=ref()

const original=ref(0)

const timer=ref()

const showControls=ref(true)

const httpurl=ref(localStorage.getItem('URL'))

const showLine=ref(false)

let props= defineProps({
  viewQuery:{
    type:String,
    default:''
  },
  rightDistance:{
    type:String,
    default:''
  }
})

const emit=defineEmits(['fullScreen','nextView'])

onMounted(()=>{
  let lineback=lineBack.value as HTMLDivElement
  let le=line.value as HTMLDivElement
  let video=myvideo.value as HTMLVideoElement
  let prog=progress.value as HTMLDivElement
  let videoLine=videoline.value as HTMLDivElement
  let videoLineBack=videolineback.value as HTMLDivElement
  let videoCache=videocache.value as HTMLDivElement

  video.addEventListener('mousemove',()=>{
    original.value=0
  })

  timer.value=setInterval(()=>{
    if(original.value>=10){
      showControls.value=false
    }else{
      showControls.value=true
      original.value++
    }
  },1000)


  video.addEventListener('playing',()=>{
    prog.style.width=video.clientWidth-40+'px'
    showLine.value=true
  })

  video.addEventListener('timeupdate',()=>{
    let house=parseInt(video.duration/3600+'',10)
    let minute=parseInt((video.duration%3600)/60+'',10)
    let secend=parseInt(video.duration%3600%60+'',10)
    endTime.value=(('0'+house).slice(-2))+':'+(('0'+minute).slice(-2))+':'+(('0'+secend).slice(-2))
    house=parseInt(video.currentTime/3600+'',10)
    minute=parseInt((video.currentTime%3600)/60+'',10)
    secend=parseInt(video.currentTime%3600%60+'',10)
    startTime.value=(('0'+house).slice(-2))+':'+(('0'+minute).slice(-2))+':'+(('0'+secend).slice(-2))
    console.log(videoLineBack.clientWidth*(video.currentTime/video.duration))
    videoLine.style.width=parseInt(videoLineBack.clientWidth*(video.currentTime/video.duration)+'',10)+'px'
    videoCache.style.width=parseInt((video.buffered.end(video.buffered.length-1)/video.duration*videoLineBack.clientWidth)+'',10)+'px'
  })

  window.addEventListener('resize',()=>{
    prog.style.width=video.clientWidth-40+'px'
  })
  function voiceMove(e:MouseEvent){
    let backHeight=lineback.getBoundingClientRect().top+lineback.clientHeight
    if(backHeight -e.pageY>=100){
      le.style.height='100px'
      video.volume=100/100
    }else if(backHeight -e.pageY<=0){
      le.style.height='0px'
      video.volume=0
    }
    else{
      video.volume=parseInt(backHeight -e.pageY+'',10)/100
      le.style.height=backHeight -e.pageY+'px'
    }
  }
  lineback.addEventListener('mouseup',(e)=>{
    let backHeight=lineback.getBoundingClientRect().top+lineback.clientHeight
    le.style.height=backHeight -e.pageY+'px'
    video.volume=parseInt(backHeight -e.pageY+'',10)/100
  })

  lineback.addEventListener('mousedown',()=>{
    window.addEventListener('mousemove',voiceMove)
  })

  window.addEventListener('mouseup',()=>{
    window.removeEventListener('mousemove',voiceMove)
  })
})

onBeforeUnmount(()=>{
  if(timer.value){
    clearInterval(timer.value)
  }
})

watch(()=>props.rightDistance,async ()=>{
  let video=myvideo.value as HTMLVideoElement
  let prog=progress.value as HTMLDivElement
  if(await appWindow.isFullscreen){
    prog.style.width=video.clientWidth-40+'px'
  }
},{deep:true})

function next(){
  emit('nextView')
}

function updateCurrentTime(e:MouseEvent){
  let video=myvideo.value as HTMLVideoElement
  let videoLineBack=videolineback.value as HTMLDivElement
  video.currentTime=parseInt((e.pageX-videoLineBack.getBoundingClientRect().left)/videoLineBack.clientWidth*video.duration+'',10)
}

function switchVoice(){
  let video=myvideo.value as HTMLVideoElement|null 
  let le=line.value as HTMLDivElement
  if(isVoice.value){
    isVoice.value=false
    if(video?.volume==0){
      video.volume=1
      le.style.height=100+'px'
    }
    
  }else{
    isVoice.value=true
    if(video?.volume){
      video.volume=0
      le.style.height=0+'px'
    }
  
  }

}

function switchState(val:string){
  let video=myvideo.value as HTMLVideoElement|null
  if(val=='play'){
    video?.play()
    isPlay.value=false
  }

  if(val=='pause'){
    video?.pause()
    isPlay.value=true
  }
}

function switchVideo(){
  let video=myvideo.value as HTMLVideoElement
  if(video.paused){
    video.play()
    isPlay.value=false
  }else{
    video.pause()
    isPlay.value=true
  }
}

async function fullScreen(){

  if(await appWindow.isFullscreen()){
    appWindow.setFullscreen(false)
    emit('fullScreen',false)
  }else{
    appWindow.setFullscreen(true)
    emit('fullScreen',true)
  }
 
}

function selectMultiple(val:string){
  let video=myvideo.value as HTMLVideoElement|null
  if(video?.playbackRate){
    video.playbackRate=Number(val)
  }
  multipleValue.value=val
}

defineExpose({
  isPlay
})

</script>

<style scoped lang='scss'>
  video{
    width: 100%;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .progress_bar{
      position: absolute;
      display: flex;
      align-items: center;
      top: -20px;
      cursor: pointer;
      .time{
        font-size: 12px;
      }
      .line_box{
        width: 100%;
        height: 5px;
        background-color: rgba($color: #e6e6e6, $alpha: 0.3);
        margin: 5px;
        position: relative;
        .line{
          background-color: #dd4f62;
          position: absolute;
          left: 0;
          top: 0;
          height: 5px;
        }

        .line_cache{
              height: 5px;
              background-color: rgba($color: #e6e6e6, $alpha: 0.5);
              position: absolute;
              bottom: 0;
        }
      }
    }
  .controls{
    position: relative;
    display: flex;
    color: white;
    position: fixed;
    bottom: 10px;
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    align-items: center;
    
    .start{
      img{
        cursor: pointer;
        width: 45px;
        height: 45px;
      }
    }
    .suspend{
      img{
        cursor: pointer;
        width: 45px;
        height: 45px;
      }
    }
    .next{
      margin-left: 15px;
      img{
        cursor: pointer;
        width: 35px;
        height: 35px;
      }
    }
    .right{
      position: absolute;
      display: flex;
      align-items: center;
      color:white;
      height: 30px;
     .multiple{
        cursor: pointer;
        font-weight: bold;
        position: relative;
        .select_box{
          position: absolute;
          background-color: rgba(0,0,0,0.5);
          top: -165px;
          left: -5px;
          text-align: center;
          font-weight: 100;
          div{
            padding: 10px 20px;
            &:hover{
              color: #dd4f62;
            }
          }
        }
        .buoy{
          width: 50px;
          text-align: center;
          &:hover{
            color: #dd4f62;
          }
        }
        
     }
     .voice{
        margin: 40px;
        position: relative;
        cursor: pointer;
        top:2px;

        .ico{
          position: relative;
          .image{
            overflow: hidden;
          }
        
          img{
            width: 25px;
            height: 25px;
            &:hover{
              position: relative;
              left: -80px;
              filter: drop-shadow(#dd4f62 80px 0);
            }
          }
        }

        .voice_progress{
            height: 110px;
            width: 30px;
            background-color: rgba(0,0,0,0.5);
            position: absolute;
            top: -110px;
            left: -3px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            .line_back{
              height: 100px;
              width: 5px;
              background-color: rgba($color: #e6e6e6, $alpha: 0.5);
              position: relative;
            }

          
            .line{
              height: 100px;
              width: 5px;
              background-color: #dd4f62;
              position: absolute;
              bottom: 0;
            }
          }
     }
     .fullscreen{
        position: relative;
        top:2px;
        cursor: pointer;
        overflow: hidden;
        img{
          width: 25px;
          height: 25px;
          &:hover{
              position: relative;
              left: -80px;
              filter: drop-shadow(#dd4f62 80px 0);
          }
        }
     }
    }
   
  }
</style>