import React from 'react'
import ReactDOM from 'react-dom'
import './tost.scss'

export default class Component extends React.Component {
  constructor(props){
    super(props)
    this.tost = document.querySelector('#tost')
    if(!this.tost) {
      this.tost = document.createElement('div')
      this.tost.classList.add('tost')
      this.tost.id = 'tost'
      document.body.appendChild(this.tost)
    }

    this.id = `${new Date().getTime()}${Math.ceil(Math.random()*100)}`

  }

  componentDidMount() {
    //console.log(this.tost.querySelectorAll('div').length)
  }

  componentWillUnmount() {

    //document.body.removeChild(this.tost)
  }

  render() {
    
    return ReactDOM.createPortal(
      <div className="tost-item" id={this.id}>{this.props.children}</div>,
      this.tost
    )
  }

}