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

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = `expires=${date.toUTCString()}`
    
    document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`
}

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
  
