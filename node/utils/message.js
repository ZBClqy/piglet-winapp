module.exports=function(flag,data=''){
    if(!flag){
        return {
            code:404,
            data:data,
            msg:"error"
        }
    }else{
        return {
            code:200,
            data:data,
            msg:"success"
        }
    }
}