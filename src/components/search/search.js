import React from 'react'
import './search.scss'

export default class Component extends React.Component {



  render() {
    const { placeholder } = this.props
    return (
      <div className="search">
        <span>
          <i className="iconfont icon-search" />
          {placeholder}
        </span>
        <input />
      </div>
    );
  }

}
