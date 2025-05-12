import style from './Footer.module.css'
import { Link } from 'react-router-dom'
import { FaPhone, FaWhatsapp, FaInstagram, FaTiktok  } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer> 
         <div className={style.footerIcons}> 
                    <Link to="/contact"><FaPhone className={style.footerBtns}/></Link>
                    <a href="https://wa.me/254755487271" target='_blank'><FaWhatsapp className={style.footerBtns}/></a>
                    <a href="https://www.instagram.com/saintsafaris" target='_blank'><FaInstagram className={style.footerBtns}/></a> 
                    <a href="https://www.tiktok.com" target='_blank'><FaTiktok className={style.footerBtns}/></a> 
         </div> 
         <div className={style.footerPages}> 
          <ul> 
           <li><Link to="/privacypolicy">Privacy Policy</Link></li> 
           <li><Link to="/terms+conditions">Terms &amp; Conditions</Link></li> 
          </ul> 
         </div> 
         <div className={style.copyrightStatement}> 
          <p>Saint Travel &amp; Safaris © 2025 All Rights Reserved</p> 
         </div> 
        </footer> 
  )
}
export default Footer