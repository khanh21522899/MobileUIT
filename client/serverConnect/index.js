import axios from "axios"

// 172.20.10.2   phone
// 192.168.1.2   home
// 172.16.4.81
const URL = process.env.EXPO_PUBLIC_API_URL

const instance = axios.create({
    baseURL: URL
})

export const getRestaurants = () => {
    return instance.get(`/restaurant`)
}

export const getRestaurantById = (id) => {
    return instance.get(`/restaurant/${id}`)

}

export const createReservation = (data) => {
    return instance.post('/reservation', data)
}

export const getReservations = () => {
    return instance.get(`/reservation`)
}

export const getReservationById = (id) => {
    return instance.get(`/reservation/${id}`)
}

export const deleteReservation = (id) => {
    return instance.delete(`/reservation/${id}`)
}

export const updateReservation = (id, data) => {
    return instance.put(`/reservation/${id}`, data)
}


