import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './orderSlice'

export default configureStore({
  reducer: {
    order: orderReducer
  },
})