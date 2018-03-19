import React from 'react'
import './baoku.scss'

export default class Component extends React.Component {

  render() {
    return (
      <div className="baoku">
        <iframe src="http://phone.baoku.com/domair/airbook/toQuery?1=1&isAppCom=null&headercolor=null"></iframe>
      </div>
    );
  }
}
