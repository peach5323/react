import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'

const Month = () => {
  // 控制弹窗开关
  const [dateVisible, setDateVisible] = useState(false)
  
  // 选择时间显示
  const [selDate, setSelDate] = useState(dayjs(new Date()).format('YYYY | M'))

  const onConfirm = (date) => {
    setDateVisible(false)
    // console.log(date);
    setSelDate(dayjs(date).format('YYYY | M'))
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div onClick={()=>setDateVisible(true)} className="date">
            <span className="text">
              {selDate+''}月账单
            </span>
            {/* 根据当前弹窗打开得状态控制expand类名是否存在 */}
            <span className= {classNames('arrow', dateVisible &&'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            // onCancel={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month