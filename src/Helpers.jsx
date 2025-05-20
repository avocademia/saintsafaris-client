const environment = import.meta.env.NODE_ENV
const isProduction = environment === 'production'

export const storeUser = (user) => {

    try {
        localStorage.setItem("user", JSON.stringify({
            firstName: user.first_name,
            middleName: user.middle_name,
            surname: user.surname,
            username: user.username,
        }))
    } catch (error) {
        throw error
    }
}

export const storeToken = (token) => {
    try {
        localStorage.setItem("accessToken", JSON.stringify(token))
    } catch (error) {
        throw error
    }
}

export const setCookie = (name, value, days = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  document.cookie = [
    `${name}=${value}`,
    `expires=${date.toUTCString()}`,
    'path=/',
    'domain=.saintsafaris.com',   // ◄─ leading dot !
    'SameSite=None',
    location.protocol === 'https:' ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join(';');
};

export const userData = () => {

    const stringifiedUser = localStorage.getItem("user")
    let user = {}
      
    if (stringifiedUser) {
        try {
            user = JSON.parse(stringifiedUser)
            const currentTime = new Date().getTime()
            if (user.expiresAt && currentTime > user.expiresAt) {
              clearUserData()
            }
        } catch (error) {
            console.error("Error parsing user data:", error)
            clearUserData()
            return {}
        }
    }
    return user
}
  
export const clearUserData = () => {

    try {
        localStorage.removeItem("user")
        localStorage.removeItem('accessToken')
    } catch (error) {
        throw error
    }
}

export const clearCookies = () => {
    document.cookie = 'acst=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
} 
  
