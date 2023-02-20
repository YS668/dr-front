import axios from 'axios'
import Element from 'element-ui'
//import router from './router'


//axios.defaults.baseURL = "http://localhost:8090/api"
axios.defaults.baseURL = "http://www.yifuday.top/api"

// 前置拦截
axios.interceptors.request.use(config => {
    return config;
}, function (error) {
    console.log('error!!!');
    return Promise.reject(error);
})

//后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;
        console.log(res)

        //token超时过期
        if(res.code == 401){
           
            Element.Message.error(res.message, {duration: 3 * 1000})
            router.push("/")
            return Promise.reject(res.message)
        }else{
            return res
        }
    },
)