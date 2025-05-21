import BlueHeader from '../../components/Blue Header/BlueHeader'
import Footer from "../../components/Footer/Footer"
import TourCard from '../../components/Tour Card/TourCard'
import fetchTours from '../../hooks/ToursFetch'
import style from "./Tours.module.css"
import {useEffect, useState} from 'react'

const Tours = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const getTours = async() => {
        try {
            const data = await fetchTours()
            setLoading(false)
            setTours(data)
        } catch (error) {
            throw error
        }
    }
      getTours()
  }, [])

  return (
    <main className={style.toursPage}>
      <BlueHeader/>
      {loading? (<section className={style.allTours}>Loading...</section>) :
          <section className={style.allTours}>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} tourId={tour.id} />
            ))}
          </section>  
      }
      <Footer/>
    </main>
  )
}

export default Tours
