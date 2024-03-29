import { Outlet, useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { BillOutline, AddCircleOutline,CalculatorOutline} from 'antd-mobile-icons'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './index.scss'
import { getBillList } from '@/store/modules/billStore'

const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  }
]

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  
  const tabbarRoute = (path) => {
    // console.log(path);
    navigate(path)
  }

  return (
    <div className='layout'>
      <div className="container">
        <Outlet/>
      </div>
      <div className="footer">
        <TabBar onChange={tabbarRoute}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title}></TabBar.Item>
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout