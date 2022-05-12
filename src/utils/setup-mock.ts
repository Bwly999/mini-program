import { isMock } from './env'
export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && isMock)
    setup()
}

export const successRespWrap = (data: unknown) => {
  return {
    data,
    error: '0',
    errmsg: '成功',
  }
}

export const failRespWrap = (data: unknown) => {
  return {
    data,
    error: '500',
    errmsg: '失败',
  }
}
