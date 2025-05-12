import axios from "axios"

const ReviewsFetch = async (tourId) => {

    const devUrl = import.meta.env.VITE_DEV_URL
    const prodUrl = import.meta.env.VITE_PROD_URL
    const environment = import.meta.env.NODE_ENV
    const url = `${environment === 'production'? prodUrl : devUrl}/api/get-reviews-by-id/${tourId}`

    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        throw error
    }
}

export default ReviewsFetch