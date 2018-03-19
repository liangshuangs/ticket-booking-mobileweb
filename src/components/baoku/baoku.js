import React from 'react'
import './baoku.scss'

export default class Component extends React.Component {

  render() {
    return (
      <div className="baoku">
        <iframe src="http://apics.baoku.com/open/api/login/oaLogin?&timestamp=20180319150757&vouchered=ce892e7d-388f-4f2e-9761-ebe96372b8a6&sign=faf809db4269ec12f5d8824ba3919b0e&passgers=41600&homePage=air&bkcid=49003&emnum=41600&direction=H5&isDisplayTW=false"></iframe>
      </div>
    );
  }
}
