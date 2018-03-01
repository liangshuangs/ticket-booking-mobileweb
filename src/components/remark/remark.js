import React from 'react'
import Header from '../header/header'
import './remark.scss'


export default class Component extends React.Component {



  render() {
    const { historyBack } = this.props
    return (
      <div className="wrap index clearfix">
        <Header title="备注" left="icon-return" right="确定" leftClick={historyBack} />
        <textarea className="remark" placeholder="输入您要备注的内容…" />
      </div>
    );
  }

}
