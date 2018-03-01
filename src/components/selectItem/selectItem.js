import React from 'react'
import './selectItem.scss'

export default class Component extends React.Component {

  getList = () => {
    const li = [0,1,2].map((v,i)=>{
      return <li key={i}>
        <p>111</p>
        <p>abc</p>
        <a><i className="iconfont icon-check"/></a>
      </li>
    })

    return <ul>
      {li}
    </ul>
  }


  render() {
    return (
      <div className="select-item">
        {this.getList()}
      </div>
    );
  }

}
