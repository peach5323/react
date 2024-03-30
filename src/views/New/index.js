import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './index.scss'
import Icon from '@/components/Icon'
import { billListData } from '@/contants'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()

  // 控制支出收入切换功能
  const [billType, setBillType] = useState('pay')

  // 收集金额
  const [money, setMoney] = useState(0)
  // 收集账单类型
  const [useFor, setUseFor] = useState('')
  // 控制时间选择器打开关闭
  const [dateVisible, setDateVisible] = useState(false)
  // 存储选择后的时间
  const [selDate, setSelDate] = useState(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') )
  
  const moneyChange = (value) => {
    setMoney(value)
  }

  const dispatch = useDispatch()
  // 保存账单
  const saveBill = () => {
    // 收集账单数据
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: dayjs(`${selDate} ${dayjs().format(' HH:mm:ss')}`),
      useFor
    }
    dispatch(addBillList(data))
    navigate('/month')
  }

  
  // 确认时间选择
  const dateConfirm = (value) => {
    setSelDate(dayjs(value).format('YYYY-MM-DD'))
    setDateVisible(false)
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType==='pay'?'selected':'')}
            onClick={()=>setBillType('pay')}
          >
            支出
          </Button>
          <Button
            shape="rounded"
            className={classNames(billType === 'income' ? 'selected' : '')}
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span onClick={() => { setDateVisible(true) }} className="text">{dayjs(selDate).format('YYYY-MM-DD')}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
                onClose={()=>setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type} >
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor===item.type?'selected':''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New