import { API_URL } from "@/utils/contants"

export const getWorkers = () => {
    return fetch(`${API_URL}/workers`).then(response=> response.json())
}