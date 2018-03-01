import React from 'react'
import './approver.scss'

export default class Component extends React.Component {

  getList = () => {
    const li = [1,2,3].map((v,i)=>{
      return <li key={i}>姓名</li>
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
