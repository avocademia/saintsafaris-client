import { useState, useEffect } from 'react'
import fetchTours from "../../hooks/ToursFetch"
import style from "./TourBooking.module.css"
import Header from "../../components/Blue Header/BlueHeader"
import Footer from '../../components/Footer/Footer'
import { toast , ToastContainer} from 'react-toastify'
import tourBooking from '../../hooks/TourBooking'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const BookingForm = () => {

    useEffect(()=> {

        const getTours = async() => {
            try {
                const data = await fetchTours()
                setTours(data)
            } catch (error) {
                toast('An error occured fetching tours', {
                    hideProgressBar: true
                })
            }
        }
        getTours()
    }, [])

    const initialUser = {
        tour: '',
        first_name: '',
        surname: '',
        phone: '',
        email: '',
        adults: '',
        children: '',
        city: '',
        travel_date: '',
        message: '',
    }
    const [formData, setFormData] = useState(initialUser)
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
  
            const updatedFormData = { 
                ...formData, 
                children: formData.children === "" ? '0' : formData.children,
            }
            await tourBooking(updatedFormData)
            setFormData(initialUser)
            setLoading(false)
            toast('Booking Successfully sent! We will contact you soon.', {
                hideProgressBar: true,
            })
    
        } catch (error) {
            setLoading(false)  
            toast(error.response.data.error.message, {
                hideProgressBar: true,
            })
            throw error
        }
    }

    if (loading) return <LoadingSpinner/>

    return (
        <section className={style.page}>
            <ToastContainer autoClose={5000}/>
            <Header/>
            <form onSubmit={handleSubmit}>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>
                        Tour:
                        <select name="tour" value={formData.tour} onChange={handleInputChange}>
                            <option value="">Select Tour</option>
                            {tours
                                .slice() // Create a shallow copy of the array
                                .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title)) // Sort by title
                                .map((tour) => (
                                    <option key={tour.id} value={tour.attributes.title}>{tour.attributes.title}</option>
                                ))}
                        </select>
                    </label>
                </div>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>
                        No. of Adults Traveling (13+):
                        <input type="number" name="adults" value={formData.adults} onChange={handleInputChange} />
                    </label>
                </div>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>
                        No. of Children Traveling (under 13):
                        <input type="number" name="children" value={formData.children} onChange={handleInputChange} min={0} placeholder={0}/>
                    </label>
                </div>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>
                        City of Residence:   
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                    </label>
                </div>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>
                        Date of Travel:
                        <input type="date" name="travel_date" value={formData.travel_date} onChange={handleInputChange} />
                    </label>
                </div>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>
                        Additional Information:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            cols={40}
                        />
                    </label>
                </div>
                <button className={style.submitBtn} type="submit">Submit</button>
            </form>
            <Footer/>
        </section>
    )
}

export default BookingForm;
