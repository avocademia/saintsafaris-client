import axios from "axios"
import {toast} from 'react-toastify'
import { setCookie } from "../Helpers"

 export const sendQuery = async (data) => {
    
    const devUrl = import.meta.env.VITE_DEV_URL
    const prodUrl = import.meta.env.VITE_PROD_URL
    const environment = import.meta.env.NODE_ENV

    try {

        const response = await axios.post(`${environment === 'production'? prodUrl : devUrl}/api/queries`, data, {
            withCredentials: true
        })
        if (response.data.jwt && typeof response.data.jwt === 'string') {
            setCookie('acst', response.data.jwt, 30)
        }
        return response
    
    } catch (error) {
        toast (`Error submitting form. Please try again later`, {
            hideProgressbar: true,
        })
        console.log(error)
    }
}

export default {sendQuery}
