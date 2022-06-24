import { TOKEN_KEY } from '@/store/user'
const BASE_URL = 'http://localhost:8080'
// const BASE_URL = 'http://139.196.12.152:8080'

interface Options {
  url: string
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  data?: string | AnyObject | ArrayBuffer
  hideError?: boolean
}
const request = (options: Options) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const token = uni.getStorageSync(TOKEN_KEY)
  if (token) {
    Object.defineProperties(headers, {
      Authorization: {
        value: token,
        writable: true,
        enumerable: true,
      },
    })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      timeout: 8000, // 8秒超时时间，单位 ms
      header: headers,
      success: (res) => {
        const data: any = res.data
        const errno = data?.errno
        console.log(options.url, '响应数据', data?.data)
        if (errno !== 0) {
          if (!options.hideError) {
            uni.showToast({
              icon: 'error',
              title: (res.data as any).errmsg,
              duration: 2000,
            })
          }
          reject(data)
        }
        else {
          resolve(data)
        }
      },
      fail: (err) => {
        console.log('err', err)
        uni.showToast({
          icon: 'error',
          title: '网络请求失败',
          duration: 2000,
        })
        // msg('请求接口失败')
        reject(err)
      },
    })
  })
}
// 导出方法
export default request
