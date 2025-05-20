import axios from "axios"
import { setCookie, storeToken, storeUser } from "../Helpers"
import { toast } from "react-toastify"

  const devUrl = import.meta.env.VITE_DEV_URL
  const prodUrl = import.meta.env.VITE_PROD_URL
  const environment = import.meta.env.NODE_ENV
  const url = `${environment === 'production'? prodUrl:devUrl}/api/auth/local`

const login = async (user) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  try{

    if (!res.ok) {
      throw new Error(data?.error?.message || "Login failed"); // <- This is critical
    }
    
    if (data.jwt && data.user) {
      toast.success("logged In succesfully",{
        hideProgressBar: true,
      })
      storeUser(data.user)
      storeToken(data.jwt)
      setCookie('acst',data.jwt,30)
    }
  } catch (error) {
      toast("An error occured please try again later", {
        hideProgressBar: true,
      })
      throw error
    }
}

export default login
