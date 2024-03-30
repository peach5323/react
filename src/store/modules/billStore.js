import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList:[]
  },
  reducers: {
    // 同步修改billList方法
    setBillList(state, action) {
      state.billList=action.payload
    },
    // 添加账单方法
    addBill(state, action) {
      state.billList.push(action.payload)
    }
  }
})

const { setBillList, addBill } = billStore.actions
// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get('http://localhost:8888/ka')
    // 触发同步reducer
    dispatch(setBillList(res.data))
  }
}

const addBillList = (data) => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.post('http://localhost:8888/ka',data)
    // 触发同步reducer
    dispatch(addBill(res.data))
  }
}

export { getBillList, addBillList }

// 导出reducer
const reducer = billStore.reducer
export default reducer