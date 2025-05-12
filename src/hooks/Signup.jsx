import axios from "axios"
import { toast } from "react-toastify"

const signup = async (user) => {

    const devUrl = import.meta.env.VITE_DEV_URL
    const prodUrl = import.meta.env.VITE_PROD_URL
    const environment = import.meta.env.NODE_ENV
    const url = `${environment === 'production'? prodUrl:devUrl}/api/auth/local/register`

    try {

      if (user.first_name && user.surname && user.username && user.email && user.password && user.dob) {
          const res = await axios.post(url, user)
          if (res) {
            toast("A confirmation email has been sent! Confirm Email then Log In", {
              hideProgressBar: true,
            })
            return <p> Account succeefully created, Go back and <Link to="/userauth">Log In</Link></p>
          }
      }
    } catch (error) {
      console.log(error)
      toast(error.response, {
        hideProgressBar: true,
      }) 
      throw error
    }
}

export default signup
