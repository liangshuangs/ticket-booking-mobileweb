import React from 'react'
import './member.scss'
import defaultuser from '../../assets/images/defaultuser.png'

export default class Component extends React.Component {

  getList = () => {
    const { selectPassenger, selectPassengerList, deletePassenger } = this.props
    if(selectPassengerList.length === 0) {
      return <ul className="list clearfix">
        <li>
          <div className="avatar">
            <i className="add iconfont icon-add" onClick={()=>{selectPassenger()}}></i>
          </div>
        </li>
      </ul>
    }
    const li = selectPassengerList.map((v,i)=>{
      return <li key={i}>
        <div className="avatar">
          <i>
            <img src={defaultuser} />
          </i>
        </div>
        <span className="username">{v.LAST_NAME}</span>
        <span className="close" onClick={()=>{deletePassenger(v)}}>
          <i className="iconfont icon-close" />
        </span>
      </li>
    })

    return <ul className="list clearfix">
      {li}
      <li>
        <div className="avatar">
          <i className="add iconfont icon-add" onClick={()=>{selectPassenger()}}></i>
        </div>
      </li>
    </ul>
  }



  render() {
    const {} = this.props
    return (
      <div className="member">
        {this.getList()}
      </div>
    );
  }

}
