import axios from "axios"
import { toast } from "react-toastify"
import {setCookie} from '../Helpers'

const accommodationBooking = async (data) => {
    
    const devUrl = import.meta.env.VITE_DEV_URL
    const prodUrl = import.meta.env.VITE_PROD_URL
    const environment = import.meta.env.NODE_ENV

    try {
        const response = await axios.post(`${environment === 'production' ? prodUrl : devUrl}/api/accommodation-booking`, data, {
            withCredentials: true
        })
        
        console.log(response.data.jwt)
        if (response.data.jwt && typeof response.data.jwt === 'string') {
            setCookie('acst', response.data.jwt, 30)
        }
        return response.data
    } catch (error) {
        toast.error('An error occurred while processing your booking. Please try again.')
        throw error
    }
}

export default accommodationBooking