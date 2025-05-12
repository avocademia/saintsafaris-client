import logoBlue from "../../assets/logo.svg"
import { FaBars, FaTimes, FaWhatsapp, FaUser, FaInstagram, FaPhone, FaCaretDown } from "react-icons/fa"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import style from "./BlueHeader.module.css"

const BlueHeader = () => {
    const navRef = useRef()
    const [isServicesOpen, setServicesOpen] = useState(false)

    const showNavBar = () => {
        navRef.current.classList.toggle(`${style.responsiveNav}`)
    }

    const toggleServicesDropdown = () => {
        setServicesOpen(!isServicesOpen);
    }

    return (
        <header className={style.blueHeader}>
            <img className={style.logo} src={logoBlue}/>
            <nav ref={navRef} className={style.navMenu}>
                <Link className={style.blueNavItem} to="/">Home</Link>
                <Link className={style.blueNavItem} to="/tours">Tours</Link>
                <div className={style.dropdown}>
                    <Link
                        onClick={toggleServicesDropdown}
                        className={style.blueNavItem}
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
                <Link className={style.blueNavItem} to="/about">About Us</Link> 
                <div className={style.buttonsContainer}>
                    <Link to="/contact"><FaPhone className={style.blueHeaderButton}></FaPhone></Link>
                    <a href="https://wa.me/254755487271" target="_blank"><FaWhatsapp className={style.blueHeaderButton}/></a>
                    <a href="https://www.instagram.com/saintsafaris" target="_blank"><FaInstagram className={style.blueHeaderButton}/></a>
                    <Link to ="/userdash"><FaUser className={style.blueHeaderButton}/></Link>
                </div>
                <button className={style.hamburgerButton}>
                    <FaTimes onClick={showNavBar} className={style.activeHamburger}/>
                </button >
            </nav>
            <button className={style.hamburgerButton}>
                    <FaBars onClick={showNavBar} className={style.blueHamburger}/>
            </button >
        </header>
    )
}

export default BlueHeader