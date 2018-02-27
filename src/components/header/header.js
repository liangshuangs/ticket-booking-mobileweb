import React from 'react'
import './header.scss'

export default class Component extends React.Component {

  getIcon = (type,value) => {
    if(value && /^icon-/.test(value)) {
      return <span className={`icon ${type}`} ><i className={`iconfont ${value}`}/></span>
    }else if(typeof value === 'string') {
      return <span className={`icon ${type}`} >
        {value}
      </span>
    }else{
      return null
    }
  }

  render() {

    const {title, left, right} = this.props

    return (
      <div className="header">
        <span className="title">{title}</span>
        {this.getIcon('left',left)}
        {this.getIcon('right',right)}
      </div>
    );
  }

}
