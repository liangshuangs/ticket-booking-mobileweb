import React from 'react'
import './header.scss'

export default class Component extends React.Component {

  getIcon = (type, value, onClick) => {
    if(value && /^icon-/.test(value)) {
      return <span className={`icon ${type}`} onClick={()=>{onClick ? onClick() : false}} >
        <i className={`iconfont ${value}`}/>
      </span>
    }else if(typeof value === 'string') {
      return <span className={`icon ${type}`} onClick={()=>{onClick ? onClick() : false}} >
        {value}
      </span>
    }else{
      return null
    }
  }

  render() {

    const {title, left, right, leftClick, rightClick} = this.props

    return (
      <div className="header">
        <span className="title">{title}</span>
        {this.getIcon('left',left, leftClick)}
        {this.getIcon('right',right, rightClick)}
      </div>
    );
  }

}
