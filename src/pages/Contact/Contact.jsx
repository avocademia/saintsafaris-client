import BlueHeader from "../../components/Blue Header/BlueHeader"
import Footer from "../../components/Footer/Footer"
import style from "./Contact.module.css"
import { FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa"
import { useState } from "react"
import {sendQuery} from '../../hooks/sendQuery'
import { ToastContainer, toast } from "react-toastify"
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const Contact = () => {

    const [loading, setLoading] = useState()
    const [data, setData] = useState({
        subject: '',
        message: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
      
    const handleSubmit = async (e) => {

        e.preventDefault()
        try {

            setLoading(true)
            const res = await sendQuery(data)
            if (res) {
                setLoading(false)
                setData({
                    subject: '',
                    message: '',
                })
                toast('query successfully sent we will get back to you shortly', {
                    hideProgressBar: true,
                    autoClose: 5000,
                })
            }
        } catch (error) {
            setLoading(false)
            throw error
        }     
    }

    if (loading === true) {
        return <LoadingSpinner/>
    }

    return (
        <main className={style.page}>
            <ToastContainer/>
            <BlueHeader/>
            <section className={style.containerOne}> 
                <article className={style.contactsOne}>
                    <a href="tel:+254722455782">
                        <div className={style.contactOption}>
                            <div className={style.iconHolder}>
                                <FaPhone className={style.icon}/>
                            </div>
                            <div className={style.textHolder}>
                                <h4>Phone Number</h4>
                                <span>+254722455782</span>
                            </div>
                        </div>
                    </a>
                    <a href="tel:+254755487271">
                        <div className={style.contactOption}>
                            <div className={style.iconHolder}>
                                <FaPhone className={style.icon}/>
                            </div>
                            <div className={style.textHolder}>
                                <h4>Phone Number</h4>
                                <span>+254755487271</span>
                            </div>
                        </div>
                    </a>
                    <a href="https://wa.me/254722455782" target="_blank">
                        <div className={style.contactOption}>
                            <div className={style.iconHolder}>
                                <FaWhatsapp className={style.icon}/>
                            </div>
                            <div className={style.textHolder}>
                                <h4>WhatsApp</h4>
                                <span>+254722455782</span>
                            </div>
                        </div>
                    </a>
                    <a href="mailto:info@saintsafaris.com">
                        <div className={style.contactOption}>
                            <div className={style.iconHolder}>
                                <FaEnvelope className={style.icon}/>
                            </div>
                            <div className={style.textHolder}>
                                <h4>Mail</h4>
                                <span>info@saintsafaris.com</span>
                            </div>
                        </div>
                    </a>
                </article>
                <article className={style.message}>
                    <h2>Send A Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={style.labelContainer}>
                            <label htmlFor="subject" id="labels" className={style.labels}>Subject</label>
                        </div>
                        <div className={style.fieldContainer}>
                            <input type="text" name="subject" id="subject" className={style.inputs} autoComplete="subject" placeholder="subject" value={data.subject} onChange={handleInputChange}/>
                        </div>
                        <div className={style.labelContainer}>
                            <label htmlFor="message" id="labels" className={style.labels}>Message</label>
                        </div>
                        <div className={style.fieldContainer}>
                            <textarea name="message" id="message" cols="30" rows="10" value={data.message} onChange={handleInputChange}></textarea>
                        </div>
                        <div className={style.fieldContainer}>
                        <button className={style.submitBtn} type="submit">Submit</button>
                        </div>
                    </form>
                </article>
                <div className={style.contactsTwo}>
                    <a href="tel:+254722455782">
                            <FaPhone className={style.icon2}/>
                    </a>
                    <a href="tel:+254755487271" target="_blank">
                            <FaPhone className={style.icon2}/>
                    </a>
                    <a href="https://wa.me/254722455782" target="_blank">
                            <FaWhatsapp className={style.icon2}/>
                    </a>
                    <a href="mailto:customercare@saintsafaris.com">
                            <FaEnvelope className={style.icon2}/>
                    </a>
                </div>
                <article className={style.physicalAddress}>
                    <h3>Physical Address</h3>
                    <p>Kisumu Ports (Next to Marine School)</p>
                    <p>New Station Road</p>
                    <p>House No. B28</p>
                    <p>P.O. Box 1288, 50300</p>
            </article>
            </section> 
            <Footer/>
        </main>
    )
}
export default Contact