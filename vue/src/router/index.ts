import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[]=[
  {
    path:'/',
    redirect:'/home/content',
  },
  {
    path:'/home',
    component:()=>import('../default/MyMain.vue'),
    children:[
      {
        path:'content',
        component:()=>import('../pages/MyContent.vue')
      }
    ]
  },
  {
    path:'/view',
    component:()=>import('../pages/myView/MyViewWin.vue')
  },
  {
    path:'/setUrl',
    component:()=>import('../pages/MySetUrl.vue')
  }
]

const router=createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/home/content'){
    if(localStorage.getItem('URL')){
      next()
    }else{
      next({path:'/setUrl'})
    }
  }
  next()
})

export default router