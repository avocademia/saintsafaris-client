// src/components/BookingForm.jsx
import { useState } from "react";
import "./AccommodationBooking.module.css";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import Header from "../../components/Blue Header/BlueHeader";
import Footer from "../../components/Footer/Footer";
import style from "../Flight Booking/FlightBooking.module.css";
import accommodationBooking from "../../hooks/AccommodationBooking";
const AccommodationBooking = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    address: "",
    check_in: "",
    check_out: "",
    adults: 0,
    children: 0,
    purpose: "",
    other_purpose : "",
    room_type: "",
    other_room_type: "",
    bed_preference: "",
    view_preference: "",
    smoking_preference: "",
    accessibility: "",
    accessibility_specification: "",
    budget: "",
    other_budget: "",
    payment_method: "",
    amenities: [],
  });


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
      bedPreferences: ["King", "Queen", "Twin", "Sofa Bed", "Extra Bed"],
      roomTypes: ["Standard", "Deluxe", "Suite", "Penthouse"],
    },
  };
  
  const features = accommodationFeatures[selectedAccommodation] || [];


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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "accommodationBooking") {
      setSelectedAccommodation(value);
      setFormData((prevData) => ({ ...prevData, amenities: [] })); // Reset amenities on type change
    }
  };
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedAmenities = checked
        ? [...(prevData.amenities || []), value] // Fallback to empty array
        : (prevData.amenities || []).filter((amenity) => amenity !== value);
  
      return { ...prevData, amenities: updatedAmenities };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true)

    if (loading === true ){
        return <LoadingSpinner/>
      }
  
    try {
      const response = await accommodationBooking(formData); // Use the hook to submit data
      if (response) {
        toast.success("Booking submitted successfully!"); // Success notification
        console.log("Booking response:", response); // Log the response for debugging
        // Reset form data after successful submission
        setFormData({
            full_name: "",
            email: "",
            contact_number: "",
            address: "",
            check_in: "",
            check_out: "",
            adults: 0,
            children: 0,
            purpose: "",
            other_purpose : "",
            room_type: "",
            other_room_type: "",
            bed_preference: "",
            view_preference: "",
            smoking_preference: "",
            accessibility: "",
            accessibility_specification: "",
            budget: "",
            other_budget: "",
            payment_method: "",
            amenities: [],
        });
      }
    } catch (error) {
      toast.error("Failed to submit booking. Please try again."); // Failure notification
      console.error("Error submitting booking:", error); // Log the error for debugging
    }
  };
  

  return (
    <section className={style.page}>
      <Header />
      <form className="form-container" id="bookingForm" onSubmit={handleSubmit}>
        <h2>Accommodation Booking Form</h2>

        <div className={style.fieldContainer}>
          <h3>1. Personal Information</h3>
          <label className={style.fieldLabel}>Full Name:
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
          />
          </label>

          <label className={style.fieldLabel}>Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          </label>

          <label className={style.fieldLabel}>Phone Number:
          <PhoneInput
            country={"ke"}
            value={formData.contact_number}
            onChange={handlePhoneChange}
            inputStyle={{ width: "100%" }}
          />
          </label>

          <label className={style.fieldLabel}>
        Accommodation Type:
        <select
          name="accommodationBooking"
          value={formData.accommodationBooking || ""}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="lodging">Lodging</option>
          <option value="private_rental">Private Rental</option>
        </select>
      </label>

      {selectedAccommodation && (
        <div>
          <h3>Select Amenities:</h3>
          {/* Handle Lodging Amenities */}
          {selectedAccommodation === "lodging" &&
            Object.entries(accommodationFeatures.lodging).map(
              ([category, features]) =>
                // Exclude Room Types and Bed Preferences for Lodging
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
                )
            )}

          {/* Handle Private Rental Amenities */}
          {selectedAccommodation === "private_rental" &&
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
            ))}
        </div>
      )}

      {/* Preferences Section */}
      {selectedAccommodation && (
        <div>
          <h3>Preferences:</h3>
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
          <div>
            <h4><label className={style.fieldLabel}>View Preferences:</label></h4>
            {accommodationFeatures.preferences.viewPreferences.map((view) => (
              <label key={view} className={style.fieldLabel}>
                <input
                  type="checkbox"
                  value={view}
                  checked={formData.amenities.includes(view)}
                  onChange={handleAmenityChange}
                />
                {view}
              </label>
            ))}
          </div>
          {/* Only show Bed Preferences and Room Types for Private Rental */}
          {selectedAccommodation === "private_rental" && (
            <>
              <div>
                <h4><label className={style.fieldLabel}>Bed Preferences:</label></h4>
                {accommodationFeatures.preferences.bedPreferences.map((bed) => (
                  <label key={bed} className={style.fieldLabel}>
                    <input
                      type="checkbox"
                      value={bed}
                      checked={formData.amenities.includes(bed)}
                      onChange={handleAmenityChange}
                    />
                    {bed}
                  </label>
                ))}
              </div>
              <div>
                <h4><label className={style.fieldLabel}>Room Types:</label></h4>
                {accommodationFeatures.preferences.roomTypes.map((roomType) => (
                  <label key={roomType} className={style.fieldLabel}>
                    <input
                      type="checkbox"
                      value={roomType}
                      checked={formData.amenities.includes(roomType)}
                      onChange={handleAmenityChange}
                    />
                    {roomType}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      )}


        </div>

                <div className={style.fieldContainer}>
          <h3>2. Stay Details</h3>
          <label className={style.fieldLabel}>Check-in Date:
          <input type="date" name="check_in"   value={formData.check_in || ""} onChange={handleInputChange}/>
          </label>
  
          <label className={style.fieldLabel}>Check-out Date:
          <input type="date" name="check_out"   value={formData.check_out || ""} onChange={handleInputChange}/>
          </label>
  
          <label className={style.fieldLabel}>Number of Guests:
          <div className="inline-field">
            <label className={style.fieldLabel}>Adults:
            <input type="number" name="children" value={formData.children} onChange={handleInputChange} />
            </label>
          </div>
          <div className="inline-field">
            <label className={style.fieldLabel}>Children:
            <input type="number" name="infants" value={formData.infants} onChange={handleInputChange} />
            </label>
          </div>
          </label>
  
          <label className={style.fieldLabel}>Purpose of Stay:
          <select name="purpose">
            <option value="Leisure">Leisure</option>
            <option value="Business">Business</option>
            <option value="Event/Conference">Event/Conference</option>
            <option value="Other">Other (specify below)</option>
          </select>
          <input type="text" name="other_purpose" placeholder="Specify if other" />
          </label>
        </div>
        <div className={style.fieldContainer}>
          <h3>3. Budget and Payment Preferences</h3>
          <label className={style.fieldLabel}>Budget Range (per night):
          <select name="budget"   value={formData.budget || ""} onChange={handleInputChange}>
            <option value="$50 - $100">$50 - $100</option>
            <option value="$101 - $200">$101 - $200</option>
            <option value="$201 - $300">$201 - $300</option>
            <option value="$301 - $500">$301 - $500</option>
            <option value="Other">Other (specify below)</option>
          </select>
          <input type="text" name="other_budget" placeholder="Specify if other" />
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
