import axios from 'axios'
import { clearUserData, clearCookies} from '../Helpers'

const devUrl = import.meta.env.VITE_DEV_URL
const prodUrl = import.meta.env.VITE_PROD_URL
const environment = import.meta.env.NODE_ENV

const logout = async () => {
    try {
        
        await axios.delete(`${environment === 'production' ? prodUrl : devUrl}/api/logout`, {
            withCredentials: true,
        })
        clearCookies()
        
    } catch (error) {
        clearUserData()
        throw error
    }
}

export default logout
