import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    finihedOrdersLength:0,
    inprogressOrdersLength:0,
    sumRevunue:0
  },
  reducers: {
    getAll: (state,action) => {
      state.orders = action.payload
      state.finihedOrdersLength = action.payload.filter(order=>order.status === "done").length
      state.inprogressOrdersLength = action.payload.filter(order=>order.status === "inprogress").length
      let sum = 0
      action.payload.forEach((value, index, arry)=>{
        sum += (Number.isInteger(value.sumPrice) && value.sumPrice);
      });
      state.sumRevunue = sum
    },

  },
})

// Action creators are generated for each case reducer function
export const { getAll, create } = orderSlice.actions

export default orderSlice.reducer