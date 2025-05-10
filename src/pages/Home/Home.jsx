import WhiteHeader from "../../components/White Header/WhiteHeader"
import Footer from "../../components/Footer/Footer"
import style from './Home.module.css'
import { Link } from "react-router-dom"
import {userData} from "../../Helpers"
import fetchTours from "../../hooks/ToursFetch"
import HomeCard from "../../components/HomeCard/HomeCard"
import { toast } from "react-toastify"
import { useState,useEffect } from "react"

const Home = () => {
  
    const [tours, setTours] = useState([])
    const {firstName} = userData() || {}


    useEffect(()=> {
      const getTours = async() => {
          try {
              const data = await fetchTours()
              setTours(data)
          } catch (error) {
              toast('An error occured fetching tours')
              console.log(error)
          }
      }
        getTours()
    }, [])
  
  return (
    <main className={style.homePage}>
      <WhiteHeader/>
      <section className={style.heroSection}>
          {!firstName? <h1>Welcome</h1> : <h1>Welcome, {firstName} </h1>}
          <p>
            Embark on a Journey with Saint Travel & Safaris!
            Unlock the Wonders of the World through our Curated Tour Packages and Exotic Destinations.
            Tailor Your Adventure with Seamless Customization.
            Let Your Wanderlust Lead the Way!
          </p>
          {!firstName? <Link to="/userauth"><button className={style.signupBtn}>Sign Up</button></Link> : <Link to="/contact"><button className={style.signupBtn}>Contact Us</button></Link>}
      </section>
      <section className={style.toursSection}>
        <h1>Popular Tours</h1>
        <div className={style.cardContainer}>
          {tours.slice(0, 3).map((tour) => (
            <HomeCard key={tour.id} tour={tour} tourId={tour.id} />
          ))}
        </div>
      </section>
      <Footer className={style.homeFooter}/>
    </main>
  )   
}

export default Home