const express=require('express')
const fs=require('fs')
const router=express.Router()
const message=require('../utils/message')
const cp=require('child_process')
const ffmpeg=require('fluent-ffmpeg')
const path=require('path')
const { stat }=require('fs').promises
let viewPath=''


router.get('/nav',function(req,res,next){
    let filesName= fs.readdirSync('Y:/aliyunpan/')
    res.send(message(true,filesName))
})

router.post('/viewsInfo',function(req,res,next){
    let filesName= fs.readdirSync('Y:/aliyunpan/'+req.body.nav)
    filesName= filesName.filter((item)=>{
        return item.indexOf('.jpg')==-1
    })
    let data=[]
    if(req.body.nav.indexOf('电影')!=-1){
        filesName.forEach((item)=>{
            readVerFile('Y:/aliyunpan/',req.body.nav,item)
            data.push({
                view:req.body.nav+'/'+item,
                name:item.split('.')[0],
                img:'static/'+item.split('.')[0]+'.jpg',
                type:'dy'
            })
        })
    }else{
        filesName.forEach((item)=>{
            let oneFile=fs.readdirSync('Y:/aliyunpan/'+req.body.nav+'/'+item).sort(function (a,b) {
                  let arr1= a.match(/\d+/g) 
                  let arr2= b.match(/\d+/ig)
                  return Number(arr1[0]) - Number(arr2[0])
              })[0]
            readOneVerFile('Y:/aliyunpan/',req.body.nav,item,oneFile)
            data.push({
                view:req.body.nav+'/'+item+'/'+oneFile,
                name:item,
                img:'static/'+item+'.jpg',
                type:'lxj'
            })
        })  
    }

    res.send(message(true,data))
})

router.get('/play',async (req,res,next)=>{
        let range=req.headers['range']
        if(req.query.view){
            viewPath=path.join('Y:/aliyunpan/'+req.query.view)
        }
        if(range){
            let stats=await stat(viewPath)
            let r=range.match(/=(\d+)-(\d+)?/)
            let start=parseInt(r[1],10)
            let end=r[2]?parseInt(r[2],10):start+1024*1024
            if(end>stats.size-1) end=stats.size-1

            let head={
                'Content-Type':'video/mp4',
                'Content-Range':`bytes ${start}-${end}/${stats.size}`,
                'Content-Length':end-start+1,
                'Accept-Ranges':'bytes',
            }
            res.writeHead(206,head)
            fs.createReadStream(viewPath,{start:start,end:end}).pipe(res)
        }else{
            fs.createReadStream(viewPath).pipe(res)
        }
})


router.get('/viewList',async (req,res,next)=>{
    let data=fs.readdirSync('Y:/aliyunpan/'+req.query.title)
    res.send(message(true,data))
})

const execJpg=(pathFile,saveFilePath)=>{
    const command=`ffmpeg -i "${pathFile}" -ss 1 -f image2 "${saveFilePath}"`
    cp.exec(command,function(res){
        console.log(res)
    })
}

const readVerFile=async (root,paths,newFile)=>{
    try{
        let statFile=await fs.stat(path.join(__dirname,'../images/')+newFile.split('.')[0]+'.jpg')
        if(!statFile.isFile()){
            execJpg(root+paths+'/'+newFile,path.join(__dirname,'../images/')+newFile.split('.')[0]+'.jpg')
        }
    }catch(err){
        execJpg(root+paths+'/'+newFile,path.join(__dirname,'../images/')+newFile.split('.')[0]+'.jpg')
    }
}

const readOneVerFile=async (root,paths,newFile,oneFile)=>{
    try{
        let statFile=await fs.stat(path.join(__dirname,'../images/')+newFile.split('.')[0]+'.jpg')
        if(!statFile.isFile()){
            execJpg(root+paths+'/'+newFile+'/'+oneFile,path.join(__dirname,'../images/')+newFile.split('.')[0]+'.jpg')
        }
    }catch(err){
        execJpg(root+paths+'/'+newFile+'/'+oneFile,path.join(__dirname,'../images/')+newFile.split('.')[0]+'.jpg')
    }
}

module.exports=router