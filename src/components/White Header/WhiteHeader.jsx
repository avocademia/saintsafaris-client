import logoBlue from "../../assets/logoWhite.png"
import { FaBars, FaTimes, FaWhatsapp, FaUser, FaInstagram, FaPhone, FaCaretDown } from "react-icons/fa"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import style from "./WhiteHeader.module.css"

const WhiteHeader = () => {
  const navRef = useRef()
  const [isServicesOpen, setServicesOpen] = useState(false)

  const showNavBar = () => {
    navRef.current.classList.toggle(`${style.responsiveNav}`)
  }

  const toggleServicesDropdown = () => {
    setServicesOpen(!isServicesOpen)
  }

  return (
    <header className={style.whiteHeader}>
      <img className={style.logo} src={logoBlue} />
      <nav ref={navRef} className={style.navMenu}>
        <Link className={style.whiteNavItem} to="/">Home</Link>
        <Link className={style.whiteNavItem} to="/tours">Tours</Link>
        <div className={style.dropdown}>
          <Link
            className={style.whiteNavItem}
            onClick={toggleServicesDropdown}
          >
            Services <FaCaretDown className={style.dropdownArrow} />
          </Link>
          {isServicesOpen && (
            <div className={style.dropdownMenu}>
              <Link to="/flight-booking" className={style.dropdownItem}>Flight Booking</Link>
              <Link to="/accommodation-booking" className={style.dropdownItem}>Accommodation</Link>
            </div>
          )}
        </div>
        <Link className={style.whiteNavItem} to="/about">About Us</Link>
        <div className={style.buttonsContainer}>
          <Link to="/contact"><FaPhone className={style.whiteHeaderButton} /></Link>
          <a href="https://wa.me/254755487271" target="_blank"><FaWhatsapp className={style.whiteHeaderButton} /></a>
          <a href="https://www.instagram.com/saintsafaris" target="_blank"><FaInstagram className={style.whiteHeaderButton} /></a>
          <Link to="/userdash"><FaUser className={style.whiteHeaderButton} /></Link>
        </div>

        <button className={style.hamburgerButton}>
          <FaTimes onClick={showNavBar} className={style.activeHamburger} />
        </button>
      </nav>

      <button className={style.hamburgerButton}>
        <FaBars onClick={showNavBar} className={style.whiteHamburger} />
      </button>
    </header>
  )
}

export default WhiteHeader
