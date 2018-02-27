import React from 'react'
import Header from '../header/header'
import Item from '../item/item'
import Member from '../member/member'
import Footer from '../footer/footer'

export default class Component extends React.Component {



  render() {
    return (
      <div className="wrap index clearfix">
        <Header title="选择乘机人" left="取消" right="完成" />
        <div className="main scroll">

        </div>
      </div>
    );
  }

}
