// utils/request.js

/**
 * 微信小程序请求封装
 * @param {Object} options 请求配置
 * @param {number} retryCount 当前重试次数（内部使用）
 */
const request = (options, retryCount = 0) => {
  // 显示加载中（可自定义）
  if (options.showLoading !== false) {
    wx.showLoading({ title: '加载中...', mask: true })
  }

  // 请求拦截：添加全局 header
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Token': wx.getStorageSync('token') || '',
    'X-Requested-With':null,
    ...options.header
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${getApp().globalData.baseUrl}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header,
      success: (res) => {
        // 响应拦截：统一处理状态码
        if (res.statusCode === 200) {
          // 业务自定义状态码处理（示例）
          if (res.data.code === 0) {
            resolve(res.data)
          } else if (res.data.code === 401) {
            // Token 过期处理
            handleTokenExpired()
            reject(res.data)
          } else {
            // 其他业务错误
            showErrorToast(res.data.message || '业务错误')
            reject(res.data)
          }
        } else {
          // HTTP 错误
          handleHttpError(res.statusCode)
          reject(res)
        }
      },
      fail: (err) => {
        // 网络错误自动重试（最多3次）
        if (retryCount < 2) {
          setTimeout(() => {
            request(options, retryCount + 1).then(resolve).catch(reject)
          }, 1000)
        } else {
          showErrorToast('网络连接失败，请重试')
          reject(err)
        }
      },
      complete: () => {
        if (options.showLoading !== false) {
          wx.hideLoading()
        }
      }
    })
  })
}

// 错误处理函数
const handleHttpError = (statusCode) => {
  const messages = {
    401: '未授权',
    404: '资源不存在',
    500: '服务器错误'
  }
  showErrorToast(messages[statusCode] || `HTTP错误: ${statusCode}`)
}

const handleTokenExpired = () => {
  wx.showModal({
    title: '提示',
    content: '登录已过期，请重新登录',
    success(res) {
      if (res.confirm) {
        wx.navigateTo({ url: '/pages/login/login' })
      }
    }
  })
}

const showErrorToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

// 导出常用方法
export const get = (url, data, options = {}) => {
  return request({ url, data, method: 'GET', ...options })
}

export const post = (url, data, options = {}) => {
  return request({ url, data, method: 'POST', ...options })
}

export default request