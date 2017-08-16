import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
// import { query } from 'services/dashboard'
import { model } from './common'


export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
   area:{
     data: [
       {country: '亚洲', year: '1750', value: 502},
       {country: '亚洲', year: '1800', value: 635},
       {country: '亚洲', year: '1850', value: 809},
       {country: '亚洲', year: '1900', value: 947},
       {country: '亚洲', year: '1950', value: 1402},
       {country: '亚洲', year: '1999', value: 3634},
       {country: '亚洲', year: '2050', value: 5268},
       {country: '非洲', year: '1750', value: 106},
       {country: '非洲', year: '1800', value: 107},
       {country: '非洲', year: '1850', value: 111},
       {country: '非洲', year: '1900', value: 133},
       {country: '非洲', year: '1950', value: 221},
       {country: '非洲', year: '1999', value: 767},
       {country: '非洲', year: '2050', value: 1766},
       {country: '欧洲', year: '1750', value: 163},
       {country: '欧洲', year: '1800', value: 203},
       {country: '欧洲', year: '1850', value: 276},
       {country: '欧洲', year: '1900', value: 408},
       {country: '欧洲', year: '1950', value: 547},
       {country: '欧洲', year: '1999', value: 729},
       {country: '欧洲', year: '2050', value: 628},
       {country: '大洋洲', year: '1750', value: 200},
       {country: '大洋洲', year: '1800', value: 200},
       {country: '大洋洲', year: '1850', value: 200},
       {country: '大洋洲', year: '1900', value: 300},
       {country: '大洋洲', year: '1950', value: 230},
       {country: '大洋洲', year: '1999', value: 300},
       {country: '大洋洲', year: '2050', value: 460},
     ],
     forceFit: true,
     height: 400,
   },
    user: {
      avatar: '/avatar.png',
      name:"MrChen",
      email:"236514977@qq.com",
      sales:2000,
      sold:3000,
    },
  },
  subscriptions: {
  },
  effects: {

  },
})
