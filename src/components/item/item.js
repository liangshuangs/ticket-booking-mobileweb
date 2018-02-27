import React from 'react'
import './item.scss'

export default class Component extends React.Component {



  render() {
    const {type, className='', label, value, onClick} = this.props
    return (
      <div className={`item ${className}`}>
        <div className="clearfix">
          <label>{label}</label>
          <span onClick={()=>{onClick()}}>{value}{type === "check" ? <i className="iconfont icon-next" /> : null}</span>
        </div>
      </div>
    );
  }

}
