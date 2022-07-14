import { API_URL } from "@/utils/contants"
import { getAll } from "@/redux/orderSlice"
import store from "@/redux/store"


export const getOrders = () => {
    return fetch(`${API_URL}/orders?_sort=created_at&_order=desc`).then(response=> response.json()).then(data=>{
        store.dispatch(getAll(data))
    })
}

export const getSingleOrder = (id) => {
    return fetch(`${API_URL}/orders/${id}`).then(response=> response.json())
}



export const createOrder = (data) => {
    return fetch(`${API_URL}/orders`,{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data),
    }).then(response=> response.json()).then(res=>console.log(res))
}

export const updateOrderStatus = (data,id) => {
    return fetch(`${API_URL}/orders/${id}`,{
        method:"PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data),
    }).then(response=> response.json()).then(res=>console.log(res))
}