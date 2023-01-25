import request from '../utils/request.js'

export const getNavList=async ()=>{
  return await request({url:'/nav',method:'get'})
}

export const getViewInfo=async (nav:string)=>{
  return await request({url:'/viewsInfo',method:'post',data:{nav}})
}

export const getViewListData=async (title:string)=>{
  return await request({url:'/viewList',method:'get',params:{title}})
}