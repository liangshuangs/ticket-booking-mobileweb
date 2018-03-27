import React from 'react'
import './task.scss'

export default class Component extends React.Component {

  getList = () => {
    const { data=[], onSelect, onClose } = this.props

    const li = data.map((v,i)=>{
      return <li key={i} onClick={()=>{onSelect(v);onClose()}}>{v.text}({v.value})</li>
    })

    return <ul>
      {li}
    </ul>
  }


  render() {
    const { onClose } = this.props
    return (
      <div className="approver">
        {this.getList()}
        <a onClick={()=>{onClose()}}>取消</a>
      </div>
    );
  }

}
