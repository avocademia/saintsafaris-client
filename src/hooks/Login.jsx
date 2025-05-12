import axios from "axios"
import { setCookie, storeToken, storeUser } from "../Helpers"
import { toast } from "react-toastify"

  const devUrl = import.meta.env.VITE_DEV_URL
  const prodUrl = import.meta.env.VITE_PROD_URL
  const environment = import.meta.env.NODE_ENV
  const url = `${environment === 'production'? prodUrl:devUrl}/api/auth/local`

    try {

      if (user.identifier && user.password) {
        
            const res = await axios.post(url, user, {withCredentials: true})
            const {data} = res

  if (data.jwt && data.user) {

                toast("logged In succesfully",{
                hideProgressBar: true,
                })

                storeUser(data.user)
                storeToken(data.jwt)
                setCookie('acst',data.jwt,30)
                
            }
};

export default login
