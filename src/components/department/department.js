import React from 'react'
import './department.scss'
import Header from '../header/header'
import Footer from '../footer/footer'
import Item from '../item/item'
import Tabs from '../tabs/tabs'
import Tost from '../tost/tost'

export default class Component extends React.Component {

  getTabData = () => {
    return [
      {
        name: "本部门",
        panel: this.getOwnPanel()
      },
      {
        name: "跨部门",
        panel: this.getOtherPanel()
      },
      {
        name: "项目",
        panel: this.getProjectPanel()
      }
    ]
  }

  getOwnPanel = () => {
    return <div className="panel">
      <Item type="info" className="topborder" label="Company(公司):" value="亚信中国" />
      <Item type="info" label="Region(地区):" value="亚信中国" />
      <Item type="info" label="CC(成本中心):" value="亚信中国" />
      <Item type="info" label="P/L Code(利润中心):" value="亚信中国" />
      <Item type="info" label="审批人" value="亚信中国" />
    </div>
  }

  getOtherPanel = () => {
    return <div className="panel">
      <Item type="check" className="topborder" label="CC(成本中心):" value="亚信中国" />
      <Item type="check" label="跨部门审批人:" value="亚信中国" />
    </div>
  }

  getProjectPanel = () => {
    return <div className="panel">
      <Item type="check" className="topborder" label="项目编码:" value="亚信中国" />
      <Item type="info" label="其他" value="亚信中国" />
    </div>
  }


  render() {
    const { department={}, historyBack, updateCostDepartment, tost } = this.props
    const { costDepartment=0 } = department
    return (
      <div className="wrap index clearfix">
        <Header title="选择费用部门" left="icon-return" leftClick={historyBack} />
        <div className="main">
          <div className="body scroll department">
            <h2>费用部门</h2>
            <Tabs data={this.getTabData()} index={costDepartment} />
          </div>
        </div>
        <Footer onClick={()=>{updateCostDepartment(1)}} />
        {tost ? <Tost><p>{tost}</p></Tost> : null}
        {tost ? <Tost time={4}><p>1</p></Tost> : null}
        {tost ? <Tost time={8}><p>2</p></Tost> : null}
      </div>
    );
  }

}
