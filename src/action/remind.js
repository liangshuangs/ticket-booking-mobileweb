import { httpApi } from '../http/http'

// 是否提醒
export const isRemind = (is) => ({
  type: 'IS_REMIND',
  is,
})

// 不要多次提醒
export const doNotRemind = () => ({
  type: 'DO_NONT_REMIND',
})

// 获取 是否需要提示
export const getRemind = (personId) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=QueryRemind&personId=${personId}`,
    options: {
      method: 'POST'
    },
    types: ['GET_REMIND'],
  },
})
// 关闭提示
export const setRemind = (personId) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=InsertNoRemind&personId=${personId}`,
    options: {
      method: 'POST'
    },
    types: ['SET_REMIND'],
  },
})