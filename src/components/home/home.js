import React from 'react'
import Header from '../header/header'
import HeaderBack from '../header/back'

export default class Component extends React.Component {



  render() {
    return (
      <div className="wrap index clearfix">
        <Header title="机票预订信息单" left={<HeaderBack />} />
        <div className="main">
          main
        </div>
      </div>
    );
  }

}
