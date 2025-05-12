import { useState } from "react";
import "./AccommodationBooking.module.css"
import { toast } from "react-toastify"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import Header from "../../components/Blue Header/BlueHeader";
import Footer from "../../components/Footer/Footer";
import style from "../Flight Booking/FlightBooking.module.css";
import accommodationBooking from "../../hooks/AccommodationBooking";
const AccommodationBooking = () => {
  const initialUser = { 
    check_in: "",check_out: "",
    adults: 0,children: 0,
    purpose: "",other_purpose : "",
    room_type: "",
    bed_preferences: [],view_preferences: [],budget: "",
    other_budget: "",payment_method: "",
    amenities: [],
 }

  const [formData, setFormData] = useState(initialUser)
  const [loading, setLoading] = useState(false)
  const [selectedAccommodation, setSelectedAccommodation] = useState("");


  const accommodationFeatures = {
    lodging: {
      RoomFeatures: [
        "Wi-Fi",
        "Room Service",
        "Daily Housekeeping",
        "Swimming Pool",
        "On-site Restaurant",
        "Spa Access",
        "Fitness Center/Gym Access",
        "Private Balcony/Terrace",
        "Workspace (Desk with Ergonomic Chair)",
        "Office Supplies",
      ],
      DiningOptions: [
        "Mini-Bar: Snacks",
        "Mini-Bar: Alcoholic Beverages",
        "Mini-Bar: Non-Alcoholic Beverages",
      ],
      TransportationAndParking: [
        "Airport Shuttle Service",
        "Free Parking",
        "Valet Parking",
      ],
      FamilyFriendlyFeatures: [
        "Crib/Baby Cot",
        "High Chair",
        "Pet-Friendly",
      ],
      LuxuryAddOns: [
        "Private Pool/Hot Tub",
        "Smoking Allowed",
      ],
      bedPreferences: ["King", "Queen", "Twin", "Sofa Bed", "Extra Bed"],
      roomTypes: ["Standard", "Deluxe", "Suite", "Penthouse"],
    },
    private_rental: [
      "Private Chef",
      "Dedicated Workspace",
      "Beach Access (Coastal Travel)",
      "Smoke Alarm",
      "Washer/Dryer Unit",
      "Gym",
      "Air Conditioning",
      "Private Entrance",
      "Parking",
      "Private Patio/Balcony",
      "Swimming Pool",
      "Heating",
    ],
    preferences: {
      numberOfRooms: "Select Number",
      numberOfBeds: "Select Number",
      viewPreferences: [
        "Ocean View",
        "City View",
        "Garden View",
        "Pool View",
        "Mountain View",
      ],
    },
  }


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    try {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    } catch (error) {
      throw error
    }
  }

  const handleChange = (e) => {
      const { name, value } = e.target

      try {
          setFormData({ ...formData, [name]: value })
          if (name === "accommodationBooking") {
            setSelectedAccommodation(value)
            setFormData((prevData) => ({ ...prevData, amenities: [] }))
          }
      } catch (error) {
          throw error
      }
  }

  const handleAmenityChange = (e) => {
      const { value, checked } = e.target

      try {
          setFormData((prevData) => {
            const updatedAmenities = checked
              ? [...prevData.amenities, value]
              : prevData.amenities.filter((amenity) => amenity !== value)

            return { ...prevData, amenities: updatedAmenities }
          })
      } catch (error) {
          throw error
      }
  }

  const handleViewPrefrenceChange = (e) => {
    const { value, checked } = e.target

    try {
        setFormData((prevData) => {
          const updatedViews = checked
            ? [...prevData.view_preferences, value]
            : prevData.view_preferences.filter((view) => view !== value)

          return { ...prevData, view_preferences: updatedViews }
        })
    } catch (error) {
        throw error
    }
  }

  const handleBedPreferencesChange = (e) => {
    const { value, checked } = e.target

    try {
        setFormData((prevData) => {
          const updatedBeds = checked
            ? [...prevData.bed_preferences, value]
            : prevData.bed_preferences.filter((bed) => bed !== value)

          return { ...prevData, bed_preferences: updatedBeds }
        })
    } catch (error) {
        throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      const response = await accommodationBooking(formData)
      if (response) {
        toast.success("Booking submitted successfully!")
        setFormData(initialUser)
      }
      setLoading(false)

    } catch (error) {
      toast.error("Failed to submit booking. Please try again.")
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner/>
  }
  
  return (
    <section className={style.page}>
      <Header />
      <form className="form-container" id="bookingForm" onSubmit={handleSubmit}>
        <h2>Accommodation Booking Form</h2>


        <div className={style.fieldContainer}>

          <label className={style.fieldLabel}>
            Accommodation Type:
            <select
              name="accommodationBooking"
              value={formData.accommodationBooking}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="lodging">Lodging</option>
              <option value="private rental">Private Rental</option>
            </select>
          </label>

          {selectedAccommodation && (
            <div>

              <h3>Select Amenities:</h3>

              {selectedAccommodation === "lodging" &&
                Object.entries(accommodationFeatures.lodging).map(

                  ([category, features]) =>
                    category !== "roomTypes" &&
                    category !== "bedPreferences" && (
                      <div key={category}>
                        <h4><label className={style.fieldLabel} htmlFor="">{category.replace(/([A-Z])/g, " $1")}</label></h4> {/* Format category names */}
                        {Array.isArray(features) &&
                          features.map((feature) => (
                            <label key={feature} className={style.fieldLabel}>
                              <input
                                type="checkbox"
                                value={feature}
                                checked={formData.amenities.includes(feature)}
                                onChange={handleAmenityChange}
                              />
                              {feature}
                            </label>
                          ))}
                      </div>
                  ))
              }

              {selectedAccommodation === "private rental" &&
                accommodationFeatures.private_rental.map((feature) => (
                  <label key={feature} className={style.fieldLabel}>
                    <input
                      type="checkbox"
                      value={feature}
                      checked={formData.amenities.includes(feature)}
                      onChange={handleAmenityChange}
                    />
                    {feature}
                  </label>
                ))
              }

              {selectedAccommodation === "private rental" &&
                <div>
                  <div>
                    <label className={style.fieldLabel}>
                      Number of Rooms:
                      <input
                        type="number"
                        name="numberOfRooms"
                        placeholder={accommodationFeatures.preferences.numberOfRooms}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div>
                    <label className={style.fieldLabel}>
                      Number of Beds:
                      <input
                        type="number"
                        name="numberOfBeds"
                        placeholder={accommodationFeatures.preferences.numberOfBeds}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              }
            </div>
          )}

          {selectedAccommodation && (
            <div>

              <h3>Preferences:</h3>

              <div>
                <h4><label className={style.fieldLabel}>View Preferences:</label></h4>
                {accommodationFeatures.preferences.viewPreferences.map((view) => (
                  <label key={view} className={style.fieldLabel}>
                    <input
                      type="checkbox"
                      value={view}
                      checked={formData.view_preferences.includes(view)}
                      onChange={handleViewPrefrenceChange}
                    />
                    {view}
                  </label>
                ))}
              </div>

              {selectedAccommodation === "lodging" && (
                <>
                  <div>
                    <h4><label className={style.fieldLabel}>Bed Preferences:</label></h4>
                    {accommodationFeatures.lodging.bedPreferences.map((bed) => (
                      <label key={bed} className={style.fieldLabel}>
                        <input
                          type="checkbox"
                          value={bed}
                          checked={formData.bed_preferences.includes(bed)}
                          onChange={handleBedPreferencesChange}
                        />
                        {bed}
                      </label>
                    ))}
                  </div>
                  <div>
                    <h4><label className={style.fieldLabel}>Room Types:</label></h4>
                    <select name="room_type" value={formData.room_type} onChange={handleChange}>
                      <option value="select">select</option>
                      {accommodationFeatures.lodging.roomTypes.map((roomType) => (
                        <option value={roomType}>{roomType}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

            </div>
          )}
        </div>

        <div className={style.fieldContainer}>

          <h3>2. Stay Details</h3>

          <label className={style.fieldLabel}>Check-in Date:
            <input type="date" name="check_in" onChange={handleInputChange}/>
          </label>
 
          <label className={style.fieldLabel}>Check-out Date:
            <input type="date" name="check_out" onChange={handleInputChange} />
          </label>
 
          <label className={style.fieldLabel}>Number of Guests:
            <div className="inline-field">
              <label className={style.fieldLabel}>Adults:
              <input type="number" name="adults" value={formData.adults} onChange={handleInputChange} />
              </label>
            </div>
            <div className="inline-field">
              <label className={style.fieldLabel}>Children:
              <input type="number" name="children" value={formData.children} onChange={handleInputChange} />
              </label>
            </div>
          </label>
 
          <label className={style.fieldLabel}>Purpose of Stay:
            <select name="purpose"  value={formData.purpose} onChange={handleChange}>
              <option value="Leisure">Leisure</option>
              <option value="Business">Business</option>
              <option value="Event/Conference">Event/Conference</option>
              <option value="Other">Other (specify below)</option>
            </select>
            <input 
              type="text" 
              name="other_purpose" 
              placeholder="Specify if other"
              value={formData.other_purpose}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={style.fieldContainer}>
          <h3>3. Budget and Payment Preferences</h3>
          <label className={style.fieldLabel}>Budget Range (per night):
            <select name="budget"  value={formData.budget} onChange={handleChange}>
              <option value="$50 - $100">$50 - $100</option>
              <option value="$101 - $200">$101 - $200</option>
              <option value="$201 - $300">$201 - $300</option>
              <option value="$301 - $500">$301 - $500</option>
              <option value="Other">Other (specify below)</option>
            </select>
            <input 
              type="text" 
              name="other_budget" 
              placeholder="Specify if other" 
              value={formData.other_budget}
              onChange={handleChange}
              />
          </label>
        </div>

        <button className={style.submitBtn} type="submit">
          Submit
        </button>
      </form>
      <Footer />
    </section>
  );
};


export default AccommodationBooking;
