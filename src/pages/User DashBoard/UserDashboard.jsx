
import { userData, clearUserData } from "../../Helpers"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import logout from "../../hooks/logout"
import dp from '../../assets/user.png'
import styles from './UserDashboard.module.css'
import BlueHeader from '../../components/Blue Header/BlueHeader'

const UserDashboard = () => {
  const user = userData() || {}
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    clearUserData()
    navigate('/')
  }

  return user.firstName? (
    <section className={styles.page}>
      <BlueHeader/>
      <main className={styles.details}>
        <img src={dp}/>
        <h1>{user.firstName} {user.surname}</h1>
        <p>@{user.username}</p>
        <button className={styles.actionBtn} onClick={handleLogout}>
          Log Out
        </button>
      </main>
    </section>
  ) : <Navigate to='/userauth'/>
}

export default UserDashboard;
