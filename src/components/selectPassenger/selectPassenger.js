import React from 'react'
import './selectPassenger.scss'
import defaultuser from '../../assets/images/defaultuser.png'

export default class Component extends React.Component {

  getIcon = (item,type,isChecked) => {
    if(type === 'delete') {
      const { onDelete } = this.props
      return <a onClick={()=>{onDelete(item)}}>
        <i className="iconfont icon-delete" />
      </a>
    }else if(isChecked) {
      return <a>
        <i className="iconfont icon-checked" />
      </a>
    }else{
      const { onSelect } = this.props
      return <a onClick={()=>{onSelect(item)}}>
        <i className="iconfont icon-check" />
      </a>
    }
  }

  getList = () => {
    const { data=[], type } = this.props
    if(data.length === 0) {
      return null
    }
    const li = data.map((v,i)=>{
      return <li key={i}>
        <img src={v.avatar ? v.avatar : defaultuser}/>
        <div className="info">
          <span>{v.value}</span>
          <span>{v.label}</span>
        </div>
        {this.getIcon(v,type, v.isChecked)}
      </li>
    })

    return <ul>
      {li}
    </ul>
  }


  render() {
    return (
      <div className="select-passenger">
        {this.getList()}
      </div>
    );
  }

}
