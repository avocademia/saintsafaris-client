import { useState, useEffect } from "react"
import style from "./FlightBooking.module.css"
import Header from "../../components/Blue Header/BlueHeader"
import Footer from "../../components/Footer/Footer"
import { toast } from "react-toastify"
import PhoneInput from "react-phone-input-2"
import countryList from "react-select-country-list"
import Select from "react-select"
import "react-phone-input-2/lib/style.css"
import flightBooking from "../../hooks/FlightBooking"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import travellers from "../../hooks/Travellers"
import multiCity from "../../hooks/MultiCity"

const FlightBooking = () => {
  const initialUser = {
    adults: 0,
    children: 0,
    infants: 0,
    travel_date: "",
    city: "",
    destination: "",
    return_date: "",
    tripType: "",
    numberOfCities: 0,
    multiCityDestinations: [],
    travelers: [],
    visaAssistance: false,
  }
  const [formData, setFormData] = useState(initialUser)
  const [loading, setLoading] = useState(false)
  const countries = countryList().getData()
  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleTripTypeChange = (e) => {
    const tripType = e.target.value;
    setFormData({
      ...formData,
      tripType,
      return_date: "",
      numberOfCities: 0,
      multiCityDestinations: [],
      destination: tripType === "one-way" ? "" : formData.destination,
    })
  }

  const handleCityCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      numberOfCities: count,
      multiCityDestinations: Array.from({ length: count }, () => ({
        city: "",
        date: "",
      })),
    })
  }

  const handleMultiCityChange = (index, field, value) => {
    const updatedCities = [...formData.multiCityDestinations];
    updatedCities[index] = {
      ...updatedCities[index],
      [field]: value,
    }
    setFormData({ ...formData, multiCityDestinations: updatedCities });
  }

  const handleTravelerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index][name] = value;
    setFormData({ ...formData, travelers: updatedTravelers });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const response = await flightBooking(formData)
      if (response.bookingId) { 
         const secondResponse = await travellers({travelers: formData.travelers,booking: response.bookingId})
      }
      if (formData.tripType === "multi-city") {
        await multiCity({cities: formData.multiCityDestinations, booking: response.bookingId})
      }
      toast.success("Booking completed successfully!")
      setFormData(initialUser)
    } catch (error) {
      console.log(error)
      toast.error("There was an error with the booking. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const totalTravelers =
      parseInt(formData.adults) +
      parseInt(formData.children) +
      parseInt(formData.infants);

    setFormData((prevFormData) => ({
      ...prevFormData,
      travelers: Array.from({ length: totalTravelers }, () => ({
        title: "",
        full_name: "",
        identification_type: "",
        identification_no: "",
        nationality: "",
      })),
    }));
  }, [formData.adults, formData.children, formData.infants])

  if (loading === true ){
    return <LoadingSpinner/>
  }

  return (
    <section className={style.page}>
        <Header/>
        <form onSubmit={handleSubmit}>
            <h2>Flight Form</h2>

            <h3>Travel Details</h3>
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>No. of Adults Travelling (12yrs+):
                <input type="number" name="adults" value={formData.adults} onChange={handleInputChange} />
              </label>
            </div>
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>No. of Children Travelling (2 - 11yrs):
                <input type="number" name="children" value={formData.children} onChange={handleInputChange} />
              </label>
            </div>
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>No. of Infants Travelling (0 - 23 months):
                <input type="number" name="infants" value={formData.infants} onChange={handleInputChange} />
              </label>
            </div>
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>City of Residence/Departure:
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
              </label>
            </div>
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>Date of Travel:
                <input type="date" name="travel_date" value={formData.travel_date} onChange={handleInputChange} />
              </label>
            </div>
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>Trip Type:
                <select name="tripType" value={formData.tripType} onChange={handleTripTypeChange}>
                  <option value="">Select</option>
                  <option value="one-way">One-way</option>
                  <option value="return">Return</option>
                  <option value="multi-city">Multi-city</option>
                </select>
              </label>
            </div>

            {(formData.tripType === 'one-way' || formData.tripType === 'return') && (
              <div className={style.fieldContainer}>
                <label className={style.fieldLabel}>Destination:
                  <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} />
                </label>
              </div>
            )}

            {formData.tripType === 'return' && (
                <div className={style.fieldContainer}>
                  <label className={style.fieldLabel}>Return Date:
                    <input type="date" name="return_date" value={formData.return_date} onChange={handleInputChange} />
                  </label>
              </div>
            )}

            {formData.tripType === 'multi-city' && (
              <>
                <div className={style.fieldContainer}>
                    <label className={style.fieldLabel}>Number of Cities:
                    <input 
                      type="number" 
                      name="numberOfCities" 
                      value={formData.numberOfCities} 
                      onChange={handleCityCountChange} 
                    />
                  </label>
                </div>
                {Array.from({ length: formData.numberOfCities }, (_, i) => (
                  <div key={i} className={style.fieldContainer}>
                    <label className={style.fieldLabel}>City {i + 1}:
                      <input
                        type="text"
                        name={`city_${i}`}
                        value={formData.multiCityDestinations[i]?.city || ''}
                        onChange={(e) => handleMultiCityChange(i, 'city', e.target.value)}
                      />
                    </label>

                    {i !== formData.numberOfCities - 1 && (
                      <label className={style.fieldLabel}>Date of departure {i + 1}:
                        <input
                          type="date"
                          name={`date_${i}`}
                          value={formData.multiCityDestinations[i]?.date || ''}
                          onChange={(e) => handleMultiCityChange(i, 'date', e.target.value)}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </>
            )}

            <h3>Traveller(s)'s Details</h3>
            {formData.travelers.map((traveler, index) => (
              <div key={index} className={style.travelerContainer}>
                <h4>Traveler {index + 1}</h4>
                <div className={style.fieldContainer}>
                  <label className={style.fieldLabel}>Title:
                    <select name="title" value={traveler.title} onChange={(e) => handleTravelerChange(index, e)}>
                      <option value="">Select Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="Miss">Master</option>
                    </select>
                  </label>
                </div>
                <div className={style.fieldContainer}>
                  <label className={style.fieldLabel}>Full Name:
                    <input type="text" name="full_name" value={traveler.full_name} onChange={(e) => handleTravelerChange(index, e)} />
                  </label>
                </div>
                <div className={style.fieldContainer}>
                  <label className={style.fieldLabel}>Identification Type:
                    <select
                      name="identification_type"
                      value={traveler.identification_type}
                      onChange={(e) => handleTravelerChange(index, e)}
                    >
                      <option value="">Select ID Type</option>
                      <option value="National ID">National ID</option>
                      <option value="Passport">Passport</option>
                      <option value="Birth Certificate">Birth Certificate</option>
                      <option value="Visa">Visa</option>
                    </select>
                  </label>
                </div>
                <div className={style.fieldContainer}>
                  <label className={style.fieldLabel}>Identification No.:
                    <input type="text" name="identification_no" value={traveler.identification_no} onChange={(e) => handleTravelerChange(index, e)} />
                  </label>
                </div>
                <div className={style.fieldContainer}>
                  <label className={style.fieldLabel}>Nationality:
                    <Select
                      options={countries}
                      name="nationality"
                      value={countries.find((country) => country.value === traveler.nationality)}
                      onChange={(value) => handleTravelerChange(index, { target: { name: 'nationality', value: value.value } })}
                      placeholder="Select Country"
                    />
                  </label>
                </div>
              </div>
            ))}
            <div className={style.fieldContainer}>
              <label className={style.fieldLabel}>
                Do you require visa assistance?
                <input
                  type="checkbox"
                  name="visaAssistance"
                  checked={formData.visaAssistance}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <button className={style.submitBtn} type="submit">Submit</button>
        </form>
        <Footer/>
    </section>
  )
}

export default FlightBooking
