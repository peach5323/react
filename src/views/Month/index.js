import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DailyBill'

const Month = () => {
  // 控制弹窗开关
  const [dateVisible, setDateVisible] = useState(false)
  
  // 选择时间显示
  const [selDate, setSelDate] = useState(dayjs().format('YYYY-MM'))

  // 按月做数据分组
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  // console.log(monthGroup);

  const [selBillList, setSelBillList]=useState([])
  const onConfirm = (date) => {
    setDateVisible(false)
    // console.log(date);
    const monthKey = dayjs(date).format('YYYY-MM')
    setSelDate(monthKey)
    setSelBillList(monthGroup[monthKey])
  }

  const monthResult = useMemo(() => {
    const pay = selBillList?.filter(item => item.type === 'pay').reduce((s, i) => s + i.money, 0)
    const income = selBillList?.filter(item => item.type === 'income').reduce((s, i) => s + i.money, 0)
    return {
      pay: pay || 0,
      income: income || 0,
      total: pay + income || 0
   }
  }, [selBillList])

  // 初始化加载渲染数据
  useEffect(() => {
    const dayKey = dayjs().format('YYYY-MM')
    if (monthGroup[dayKey]) {
      
      setSelBillList(monthGroup[dayKey])
    }
  }, [monthGroup])

  // 月度账单-单日统计列表
  const dayGroup = useMemo(() => {
    const dayBillList = _.groupBy(selBillList, item => dayjs(item.date).format('YYYY-MM-DD'))
    return {
      dayKeys: Object.keys(dayBillList),
      dayBillList
    }
  }, [selBillList])

  // console.log(dayGroup);

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
              <span className="money">{monthResult?.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult?.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult?.total.toFixed(2)}</span>
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
        {
          dayGroup.dayKeys.map(dayKey => (
            <DailyBill key={dayKey} date={dayKey} billList={dayGroup.dayBillList[dayKey] } />
          ))
}
       
      </div>
    </div >
  )
}

export default Month