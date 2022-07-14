import { API_URL } from "@/utils/contants"

export const getProducts = () => {
    return fetch(`${API_URL}/products`).then(response=> response.json())
}