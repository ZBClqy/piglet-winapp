<template>
  <div class="nav">
        <div class="logo">
            <img src="../assets/pig.svg" alt="">
            <div class="title">小粉猪</div>
        </div>
        <div class="navgation">
            <template v-for="(item,index) in navs" :key="index">
                <div class="nav_item" :class="index==0?'check_nav':''">{{item}}</div>
            </template>
        </div>
        <div @click="showSet" class="setup">
            <img  src="../assets/setup.svg" alt="">
        </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive,watch,nextTick } from 'vue'
import * as API from '../api'

const navs:string[]=reactive([])

const emit=defineEmits(['selectNav','showSetups'])

async function getNavs(){
  try{
    let response= await API.getNavList()
    navs.push(...response?.data)
  }catch(err){/** */}
}

getNavs()

watch(()=>navs,()=>{
  nextTick(()=>{
    let navdoms=document.querySelectorAll('.nav_item')
    navdoms.forEach((val:Element)=>{
      val.addEventListener('click',()=>{
        navdoms.forEach((item:Element)=>{
          item.className='nav_item'
        })
        val.className='nav_item check_nav'
        emit('selectNav',val.innerHTML)
      })
    })
    emit('selectNav',navs[0])
  })
},{deep:true})
  

function showSet(){
  emit('showSetups')
}

</script>

<style scoped lang='scss'>
    .nav{
        width: 150px;
        height: 100vh;
        background-color:var(--navColor);
        transition: background-color 1s;
        position: relative;
        z-index: 1;
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
            overflow: hidden;
            img{
                width: 50px;
                height: 50px;
                position: relative;
                left: -100px;
                filter: drop-shadow(var(--fontColor) 100px 0);
            }
            .title{
                color: var(--fontColor);
                font-size: 22px;
                font-weight: bold;
            }
        }
        .navgation{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            .nav_item{
                padding: 20px 0;
                cursor: pointer;
                &:hover{
                    color:#bacac6;
                }
            }

            .check_nav{
                color:#bacac6;
            }
        }
        .setup{
          width: 50px;
          height: 50px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: 20px;
            left: 70px;
            transform: translateX(-50%);
            cursor: pointer;
          }
        }
    }
</style>