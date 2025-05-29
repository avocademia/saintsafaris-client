import WhiteHeader from "../../components/White Header/WhiteHeader"
import Footer from "../../components/Footer/Footer"
import Accordion from "../../components/Tour Accordion/Accordion"
import Form from "../../components/Review Form/Form"
import quote from "../../assets/quote.png"
import user from "../../assets/user.png"
import Thankyou from "../../components/Review Form/Thankyou"
import Login from "../../components/Review Form/Login"
import useDataFetching from "../../hooks/TourFetch"
import useReviewCheck from "../../hooks/ReviewCheck"
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css'
import style from "./Tour.module.css"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Link, useParams } from "react-router-dom"
import { FaBed, FaSun, FaStar, FaLessThanEqual, FaCloudDownloadAlt } from "react-icons/fa"
import { userData } from "../../Helpers"
import fetchReviews from "../../hooks/ReviewsFetch"
import { useEffect, useState } from "react"

const Tour = () => {
  const { id } = useParams()
  const {username} = userData()
  const isReviewAdded = useReviewCheck(id)
  const [newReview, setNewReview] = useState(false)
  const [allReviews, setReviews]  = useState([])
  const [tour, setTour] = useState({
    attributes: {
      title: "Loading Tour...",
      description: "",
      days: 0,
      nights: 0, 
      ideal_dates: {},
      disclaimer: {},
      cancellations: {},
      media: {
        data: [
          {
            id: 0,
            attributes: {
              url: "",  // Default to an empty string for the URL
              name: "Default Image",
            },
          },
        ],
      },
    },
    id: 0,
  })

  const onSubmit = () => {
    setNewReview(true)
  }

  useEffect(() =>{
    const fetchTourData = async () => {
      try {

        const data = await useDataFetching(id)
        const reviews = await fetchReviews(id)
        setTour(data.data)
        console.log(data.data)
        const actualText = () => {
          const actualReviews = reviews.map(review => {
            const actualReview = review
            const Review = document.createElement('textarea')
            Review.innerHTML = actualReview.body
            actualReview.body = Review.innerHTML
            return actualReview
          })
          
          setReviews(actualReviews)
        }
        actualText()
  
      } catch (error) {
        throw error
      }
    }
    fetchTourData()
    window.scrollTo(0, 0)
  },[newReview])

  /*const handleItinerary = () => {
    toast ( "service currently unavailable", {
      hideProgressBar: true,
    })
  }*/

  const devUrl = import.meta.env.VITE_DEV_URL
  const prodUrl = import.meta.env.VITE_PROD_URL

  return (
    <main className={style.page}>
      <WhiteHeader />
      <section className={style.imageSlider}>
        <h1>{tour.attributes.title}</h1>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 50,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className={`${style.mySwiper} mySwiper`}
        >
          {tour && tour.attributes.media.data.map((photo) => (
            <SwiperSlide key = {photo.id} className={`${style.swiperSlider} swiperSlider`}>
              <img src={`${import.meta.env.NODE_ENV === 'production'? prodUrl : devUrl}${photo.attributes.url}`} alt={photo.attributes.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className={style.secondSection}>
        <article className={style.description}>
          <p>{tour.attributes.description}</p>
          <div className={style.durationButtons}>
            <div className={style.duration}>
              <FaSun />
              <p>{tour.attributes.days}</p>
            </div>
            <div className={style.duration}>
              <FaBed />
              <p>{tour.attributes.nights}</p>
            </div>
          </div>
        </article>
        <Accordion data={tour} />
        <article className={style.tourPackageButtons}>
          {/*<button onClick = {handleItinerary}>Itinerary</button>*/}
          <Link to="/tourbooking"><button>Book Now</button></Link>
        </article>
      </section>
      <section className={style.thirdSection}>
        {!isReviewAdded && newReview===false && username && <Form tourId = {id} reviewChecker = {onSubmit}/>}
        {(isReviewAdded || newReview===true) && username && <Thankyou/>}
        {!username && <Login/>}
        <article className={style.reviewSliderContainer}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 50,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className={`${style.mySwiper} mySwiper`}
          >
            {allReviews.map((review) => (
              <SwiperSlide className={`${style.reviewSlider} swiperSlider`} key={review.id}>
                <div className={style.topSlideSection}>
                  <div className={style.customerProfile}>
                    <div className={style.profilePhoto}>
                      <img src={user} alt="customer profile" />
                    </div>
                    <h3>{review.first_name}</h3>
                    <h3>{review.surname}</h3>
                  </div>
                  <div className={style.quote}>
                    <img src={quote} alt="quotation" />
                  </div>
                </div>
                <div className={style.slideBottomSection}>
                  <div className={style.customerRating}>
                    {Array.from({length: review.rating}).map((_, index) => (
                      <FaStar className={style.customerStars} key={index} />
                    ))}
                  </div>
                  <p className={style.reviewBody}>{review.body}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      </section>
      <Footer />
    </main>
  )
}

export default Tour;
