function env(){
  if(process.env.REACT_APP_ENV === 'development'){
    // 开发
    return {
      ENV:'development',
      ROOT_PATH:'/mobileapps/kara-ticket-booking-mobileweb',
      GATEWAY:'https://xin-sandbox.asiainfo.com:16020/api/',
      BAOKU:'http://apics.baoku.com/open/api/login/oaLogin',
    }
  } else if(process.env.REACT_APP_ENV === 'test'){
    // 测试
    return {
      ENV:'test',
      ROOT_PATH:'/mobileapps/kara-ticket-booking-mobileweb',
      GATEWAY:'https://xin-sandbox.asiainfo.com:16020/api/',
      BAOKU:'http://apics.baoku.com/open/api/login/oaLogin',
      }
  } else{
    // 生产 process.env.REACT_APP_ENV === 'production'
    return {
      ENV:'production',
      ROOT_PATH:'/mobileapps/kara-ticket-booking-mobileweb',
      GATEWAY:'https://karagw.asiainfo.com/api/',
      BAOKU:'http://openapi.baoku.com/open/api/login/oaLogin',
    }
  }
}

export default env()