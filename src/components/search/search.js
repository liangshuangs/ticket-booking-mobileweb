import React from 'react'
import './search.scss'

export default class Component extends React.Component {

    constructor(props) {
        super(props)
        const { placeholder } = this.props
        this.state = {
            focus: false,
            show: true,
        }
    }

    onChange = (e) => {
        const value = e.target.value
        this.props.onChange(value)
    }

    onFocus = (e) => {
        const value = e.target.value
        if(!value) {
            this.setState({show: false})
        }
    }

    onBlue = (e) => {
        const value = e.target.value
        if(!value) {
            this.setState({show: true})
        }
    }

  render() {
    const { placeholder } = this.props
      const { show } = this.state
    return (
      <div className="search">
        <p className={`${show ? '' : 'hidden'}`}>
          <i className="iconfont icon-search" />
            <span>{placeholder}</span>
        </p>
        <input onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlue} />
      </div>
    );
  }

}
