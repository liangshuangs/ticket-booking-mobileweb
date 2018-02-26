import React from 'react'
import './header.scss'

export default class Component extends React.Component {

  render() {

    const {title, left, right} = this.props

    return (
      <div className="header">
        <span className="title">{title}</span>
        {left ? left : null}
        {right ? right : <span className="icon right" >right</span>}
      </div>
    );
  }

}
