import { httpApi } from '../http/http'


// 获取乘机人列表
export const getPassenger = (kw, bgId, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetPassengers&empName=${kw}&ntAccount=${kw}&tel=${kw}&bgId=${bgId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PASSENGER_SUCCESS'],
  },
})

// 获取最近乘机人列表
export const getRecentPassenger = (personId, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetPassengersByPersonId&personId=${personId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_RECENT_PASSENGER_SUCCESS'],
  },
})

// 设置最近乘机人头像
export const setRecentPassenger = (list) =>({
  type:'SET_RECENT_PASSENGER',
  list
})

// 选择的乘机人数组
export const selectPassenger = (selectList) => ({
  type: 'SELECT_PASSENGER',
  selectList,
})

// 删除一个乘机人
export const deletePassenger = (item) => ({
  type: 'DELETE_PASSENGER',
  item,
})

// 获取乘机人头像
export const getPassengerAvatar = (staffCodes) => ({
  [httpApi]: {
    url: '/account/getAccountHeadIcons',
    options: {
      method: 'POST',
      body: {staffCodes}
    },
    types: ['GET_PASSENGER_AVATAR_SUCCESS'],
  },
})