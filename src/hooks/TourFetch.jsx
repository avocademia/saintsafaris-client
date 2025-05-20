import axios from 'axios'

const fetchSingleTour = async (id) => {

        const environment = import.meta.env.NODE_ENV
        const isProduction = environment === 'production'
        const devUrl = import.meta.env.VITE_DEV_URL
        const prodUrl = import.meta.env.VITE_PROD_URL
        const apiToken = isProduction? import.meta.env.VITE_PROD_API_TOKEN : import.meta.env.VITE_DEV_API_TOKEN


      try {

        const res = await axios.get(
          `${environment === 'production'? prodUrl : devUrl}/api/tours/1?populate[media]=true&populate[display_picture]=true`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        )
        return res.data

      } catch (error) {
        throw error
      }
}

export default fetchSingleTour
