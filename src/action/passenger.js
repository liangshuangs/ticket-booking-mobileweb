import { httpApi } from '../http/http'

export const getPassenger = (kw, bgId, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetPassengers&empName=${kw}&ntAccount=${kw}&tel=${kw}&bgId=${bgId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PASSENGER_SUCCESS'],
  },
})