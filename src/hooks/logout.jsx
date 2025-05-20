import axios from 'axios'
import { clearUserData, clearCookies} from '../Helpers'

const devUrl = import.meta.env.VITE_DEV_URL
const prodUrl = import.meta.env.VITE_PROD_URL
const environment = import.meta.env.NODE_ENV

const logout = async () => {
    try {
        clearCookies()
        await axios.delete(`${environment === 'production' ? prodUrl : devUrl}/api/logout`, {
            withCredentials: true,
        })
        clearUserData()
        
    } catch (error) {
        clearCookies()
        clearUserData()
        throw error
    }
}

export default logout
