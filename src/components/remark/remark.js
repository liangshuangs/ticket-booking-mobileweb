import React from 'react'
import Header from '../header/header'
import './remark.scss'


export default class Component extends React.Component {

  setRemark = () =>{
    this.props.setRemark(this.remark.value)
    this.props.historyBack()
  }

  render() {
    const { historyBack, remark } = this.props
    return (
      <div className="wrap index clearfix">
        <Header title="备注" left="icon-return" right="确定" leftClick={historyBack} rightClick={()=>{this.setRemark()}} />
        <textarea ref={(e)=>{this.remark = e}} className="remark" placeholder="输入您要备注的内容…" defaultValue={remark.text} />
      </div>
    );
  }

}
