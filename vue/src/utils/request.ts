import axios from 'axios'


type option_type = {url:string,data?:object,method:string,params?:object,headers?:object}

const http=axios.create({
  baseURL:localStorage.getItem('URL') as string,
  timeout:3000,
})

http.interceptors.request.use(function(config){
  return config
})

http.interceptors.response.use(function(response){
  return response.data
})


const myrequest=async(options:option_type)=>{
  try{
    return await http(options)
  }catch(err){/** */}
}

export default myrequest