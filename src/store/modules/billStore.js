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
    }
  }
})

const { setBillList } = billStore.actions
const getBillList = async (dispatch) => {
  // 编写异步请求
  const res = await axios.get('http://localhost:8888/ka')
  // 触发同步reducer
  dispatch(setBillList(res.data))
}

export {getBillList}
const reducer = billStore.reducer
export default reducer