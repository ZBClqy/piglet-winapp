const express = require('express')
const app = express()
const port = 3000
const indexRouter=require('./router/index.js')
const path=require('path')

app.all("*",function(req,res,next){
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin','*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers','content-type,paths');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
    if(req.method.toLowerCase() == 'options')
        res.sendStatus(200); // 让options 尝试请求快速结束
    else
        next();
})

app.use('/static',express.static(path.join(__dirname,'images')))

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(indexRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})