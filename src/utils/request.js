import axios from 'axios'
import qs from 'qs'
import lodash from 'lodash'
// import jsCookie from 'js-cookie'
import { YQL, CORS } from './config'
/*拦截*/
/*axios.interceptors.response.use(function (response) {


});*/
const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)
  // const csrfToken =jsCookie.get('csrfToken')
  const instance = axios.create({
    // headers: {'x-csrf-token': csrfToken}
  });
  switch (method.toLowerCase()) {
    case 'get':
      return instance.get(url, {
        params: cloneData,
      })
    case 'delete':
      return instance.delete(url, {
        data: cloneData,
      })
    case 'post':
      return instance.post(url, cloneData)
    case 'put':
      return instance.put(url, cloneData)
    case 'patch':
      return instance.patch(url, cloneData)
    default:
      return instance(options)
  }
}


export default function request (options) {

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    console.log(data)
    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
