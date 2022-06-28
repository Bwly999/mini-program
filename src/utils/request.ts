import { TOKEN_KEY } from '@/store/user'
const BASE_URL = 'https://springboot-5jpr-2050213-1311358521.ap-shanghai.run.tcloudbase.com'
// const BASE_URL = 'http://www.bwly999.top:8080'
// const BASE_URL = 'http://139.196.12.152:8080'
// const BASE_URL = 'http://47.99.200.3:8080'

function qsStringify(data: any) {
  let qs = ''
  for (const key in data) {
    console.log(key)
    qs += `${key}=${encodeURI(data[key])}&`
  }
  return qs.substring(0, qs.length - 1)
}
interface Options {
  url: string
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  data?: string | AnyObject | ArrayBuffer | any
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
    let url = BASE_URL + options.url
    if (options.method === 'GET' && options.data !== undefined)
      url += `?${qsStringify(options.data)}`

    let data
    if (options.method === 'GET')
      data = {}
    else
      data = options.data

    uni.request({
      url,
      method: options.method || 'GET',
      data,
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
