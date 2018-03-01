export const httpApi = Symbol('call ajax api')

const requestApi = (url, options) => {
  
}

export default () => store => next => action => {
  console.log(action)

  const httpSymbol = action[httpApi]
  if (typeof httpSymbol === 'undefined') {
    return next(action)
  }
  const { options, types, url } = httpSymbol
  if (typeof url !== 'string') {
    throw new Error('请指定请求路径！')
  }
  if (!Array.isArray(types) || !types.every(x => typeof x === 'string')) {
    throw new Error('请指定的action types数组，且每个元素为string类型')
  }

  const actionWith = obj => ({
    ...action,
    [httpApi]: undefined,
    requestInformation: httpSymbol,
    ...obj,
  })

  const [
    successType,
    requestType = 'HTTP_REQUEST',
    failureType = 'HTTP_FAILURE',
    errorType = 'HTTP_ERROR',
  ] = types

  next(actionWith({ type: requestType }))

  return requestApi(url, options)
      .then((response) => {
        if (response.resultCode === '000000') {
          return next(actionWith({
            type: successType,
            response,
          }))
        }
        return next(actionWith({
          response,
          type: failureType,
        }))
      })
      .catch((error) => {
        next(actionWith({
          error,
          type: errorType,
        }))
        if (typeof catchError === 'function') {
          catchError(error)
        }
      })

}