import React from 'react'
import './selectPassenger.scss'
import defaultuser from '../../assets/images/defaultuser.png'

export default class Component extends React.Component {

  getList = () => {
    const li = [0,1,2].map((v,i)=>{
      return <li key={i}>
        <img src={defaultuser}/>
        <div className="info">
          <span>徐军 (35023)</span>
          <span>亚信软件</span>
          <span>身份证：41150101010101010</span>
        </div>
        <a>
          <i className="iconfont icon-delete" />
        </a>
      </li>
    })

    return <ul>
      {li}
    </ul>
  }


  render() {
    return (
      <div className="select-passenger">
        {this.getList()}
      </div>
    );
  }

}
