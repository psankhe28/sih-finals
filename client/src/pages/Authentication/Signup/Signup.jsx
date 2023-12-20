import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../client';
import '../Auth.css'

const SignUp = () => {

    const [formData, setFormData] = useState({
        fullName: '', password: '', phone: '', email: ''
    })
    const [otp, setOtp] = useState()

    const [eData, setEData] = useState({
        email: '', epassword: '', efullName: '', aicte: '',instituteName: ''
    })
    const [level, setLevel] = useState('student')
    const [user, setUser] = useState(true)

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }

        })

    }
    function handleChange2(event) {
        setOtp((prevOtp) => {
            return {
                ...prevOtp,
                [event.target.name]: event.target.value
            }

        })

    }
    function handleEChange(event) {
        setEData((prevEData) => {
            return {
                ...prevEData,
                [event.target.name]: event.target.value
            }

        })
    }
    function handleOptions(event) {
        if (event.target.value === 'student') {
            setLevel(event.target.value);
            setUser(true);
        } else {
            setLevel(event.target.value);
            setUser(false);
        }
        
    }


    async function handleESubmit(e) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signUp(
                {
                  email: eData.email,
                  password: eData.epassword,
                  options: {
                    data: {
                      full_name: eData.efullName,
                      level: level,
                      aicte: eData.aicte,
                      instituteName: eData.instituteName,
                    }
                  }
                }
              )

            if (error) {
                throw error
            }
            alert('Check your email for otp')
        } catch (error) {
            alert(error)
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const { data, error } = await supabase.auth.signUp(
                {
                    phone: formData.phone,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                            email: formData.email,
                            level: level,
                        }
                    }
                }
            )

            if (error) {

                throw error
            }

            alert('Check your email for verification link')


        } catch (error) {
            alert(error)
        }
    }
    async function handleFinal(e) {
        e.preventDefault()

        try {
            console.log(otp.otp)
            console.log(formData.phone)
            const {
                data,
                error,
            } = await supabase.auth.verifyOtp({
                phone: formData.phone,
                token: otp.otp,
                type: 'sms',
            })


            if (error) throw error
            alert('successfull logged in')


        } catch (error) {
            alert(error)
        }
    }
    return (

        <div className="containerr">
            <div className="forms-containerr">
                <div className="signin-signup">
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <select name="level" onChange={handleOptions}>
                                <option value="student">Student</option>
                                <option value="institution">Institution</option>
                                <option value="state">State</option>
                            </select>
                        </div>
                        {user ? (<>

                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" onChange={handleChange} name='fullName' placeholder="Full Name" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-phone"></i>
                                <input type="text" onChange={handleChange} name='phone' placeholder="+91xxxxxxxxxx" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" onChange={handleChange} name='email' placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" onChange={handleChange} name='password' placeholder="Password" />
                            </div>
                            <button className="button" onClick={handleSubmit}>Get OTP</button>

                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="text" onChange={handleChange2} name='otp' placeholder="OTP" />
                            </div>
                            <button onClick={handleFinal} className="button">Signup</button></>)
                            : (<>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" onChange={handleEChange} name='aicte' placeholder="Aicte Code/State Code" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" onChange={handleEChange} name='instituteName' placeholder="Institute Name/State Name" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" onChange={handleEChange} name='efullName' placeholder="Full Name" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" onChange={handleEChange} name='email' placeholder="Email" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleEChange} name='epassword' placeholder="Password" />
                                </div>
                                <button onClick={handleESubmit} className="button">Signup</button>
                            </>)
                        }

                    </form>

                </div>
            </div>

            <div className="panels-containerr">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <Link to='/login'><button className="button transparent" id="sign-up-button" >
                            Login
                        </button></Link>

                    </div>
                    <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default SignUp