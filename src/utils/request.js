import axios from 'axios'
import qs from 'qs'
import lodash from 'lodash'

import { message } from 'antd'
import { YQL, CORS } from './config'
/*拦截*/
const successStatus = 1;
const errorStatus = [-1,101];
axios.interceptors.response.use(function (response) {
  console.log(response)

  const { statusText, status } = response
  let data = response.data
  if(response.status == 200){
    if (response.data.code === successStatus) {
      console.log("successStatus1")

      let data = response.data
      /*return  Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...data
      })*/

      return {
        success: true,
        message: statusText,
        statusCode: status,
        ...data
      }
    } else if(errorStatus.indexOf(response.data.code) !== -1){
      console.log("successStatus2")
      // console.log(errorStatus.indexOf(res.data.code))
      // return  Promise.resolve({ success: false, statusCode:response.status, message: data.message ||  'Network Error' })
      return  { success: false, statusCode:response.status, message: data.message ||  'Network Error' }
    }else {
      console.log("successStatus3")
      // return Promise.resolve({ success: false, statusCode:response.status, message: data.message ||  'Network Error' })
      return { success: false, statusCode:response.status, message: data.message ||  'Network Error' }
    }
  }
}, function (error) {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
  return  { success: false, statusCode, message: msg }
});
const request = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)


  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default  request

/*export default function request (options) {

  return fetch(options).then((response) => {
    console.log(response)
    const { statusText, status } = response
    let data = response.data


    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}*/
