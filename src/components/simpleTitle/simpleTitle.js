import React from 'react'
import './simpleTitle.scss'

export default class Component extends React.Component {
  render() {
    const { title } = this.props
    return (
      <h2 className="simple-title">{title}</h2>
    )
  }
}