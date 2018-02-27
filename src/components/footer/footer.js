import React from 'react'
import './footer.scss'

export default class Component extends React.Component {



  render() {
    const {} = this.props
    return (
      <div className="footer">
        <button>确定</button>
        <p>温馨提示：请勿打印行程单，仅保留登机牌<br/>若遇订票异常，人工订票电话：400-6566-722</p>
      </div>
    );
  }

}
