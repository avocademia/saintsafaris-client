import BlueHeader from '../../components/Blue Header/BlueHeader';
import Footer from "../../components/Footer/Footer"
import TourCard from '../../components/Tour Card/TourCard';
import fetchTours from '../../hooks/ToursFetch'
import style from "./Tours.module.css"
import {useEffect, useState} from 'react'
import {userData} from "../../Helpers"
import { toast } from 'react-toastify';

const Tours = () => {
  const [tours, setTours] = useState([])
  const {firstName} = userData() || {}

  useEffect(()=> {
    const getTours = async() => {
        try {
            const data = await fetchTours()
            setTours(data)
        } catch (error) {
            toast('An error occured fetching tours')
        }
    }
      getTours()
  }, [])

  return (
    <main className={style.toursPage}>
      <BlueHeader/>
      <section className={style.allTours}>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} tourId={tour.id} />
        ))}
      </section>
      <Footer/>
    </main>
  );
};

export default Tours;
