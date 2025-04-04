// api/index.js
import { get, post } from '../utils/request'

// 用户相关接口
export const userApi = {
  login: (data) => post('/user/login', data),
  getUserInfo: () => get('/user/info'),
  updateProfile: (data) => post('/user/update', data)
}

// 商品相关接口
export const productApi = {
  getList: (params) => get('/product/list', params),
  getDetail: (id) => get(`/product/detail/${id}`),
  createOrder: (data) => post('/order/create', data)
}

// nav相关
export const getNavAll = {
  getNavList:()=>post("/nav/getAll"),
}

// 其他模块...