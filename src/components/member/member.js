import React from 'react'
import './member.scss'
import defaultuser from '../../assets/images/defaultuser.png'

export default class Component extends React.Component {

  getList = () => {
    const { selectPassenger } = this.props
    const li = [0,1,2,3,4,5,6].map((v,i)=>{
      return <li key={i}>
        <div className="avatar">
          <i>
            <img src={defaultuser} />
          </i>
        </div>
        <span className="username">徐军</span>
        <span className="close">
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
