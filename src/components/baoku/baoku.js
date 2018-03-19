import React from 'react'
import './baoku.scss'

export default class Component extends React.Component {

  render() {
    return (
      <div className="baoku">
        <iframe src={sessionStorage.baoku}></iframe>
      </div>
    );
  }

}
