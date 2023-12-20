import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../client';
import '../Auth.css'

const Login = ({ setToken }) => {
    let navigate = useNavigate()

    const [formData, setFormData] = useState({
        phone: '', password: ''
    })
    const [level, setLevel] = useState('student')
    const [eData, setEData] = useState({
        email: '', epassword: ''
    })
    const [user, setUser] = useState(true)
    console.log(formData)

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
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
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                phone: formData.phone,
                password: formData.password,
            })
            if (error) throw error
            console.log(data)
            setToken(data)
            if (level === 'student') {
                navigate('/student/profile')
            }
            else if (level === 'state') {
                navigate('/state/view-schemes')
            }
            else {
                navigate('/institute/accepted-applicants')
            }
            //history.push('/homepage')
            // navigate('/homepage')
            //   alert('Check your email for verification link')

        } catch (error) {
            alert(error)
        }
    }
    async function handleESubmit(e) {
        e.preventDefault()
        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: eData.email,
                password: eData.epassword,
            })
            if (error) throw error
            console.log(data)
            setToken(data)
            //history.push('/homepage')
            if (level === 'student') {
                navigate('/student/profile')
            }
            else if (level === 'state') {
                navigate('/state/view-schemes')
            }
            else {
                navigate('/institute/accepted-applicants')
            }
            //   alert('Check your email for verification link')

        } catch (error) {
            alert(error)
        }
    }


    async function handleForgotpass(e) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                redirectTo: 'https://example.com/update-password',
            })

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="containerr">
            <div className="forms-containerr">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <select name="user" onChange={handleOptions}>
                                <option value="student">Student</option>
                                <option value="institution">Institution</option>
                                <option value="state">State</option>
                            </select>
                        </div>
                        {user ?
                            (<>
                                <div className="input-field">
                                    <i className="fas fa-phone"></i>
                                    <input type="text" onChange={handleChange} placeholder="Phone" name='phone' />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleChange} placeholder="Password" name='password' />
                                </div>
                                {/* <button onClick={handleForgotpass}>Forgot password</button> */}
                                <button onClick={handleSubmit} className="button solid">Sign in</button>
                            </>)
                            : (<>
                                <div className="input-field">
                                    <i className="fas fa-envelope"></i>
                                    <input type="text" onChange={handleEChange} placeholder="Email" name='email' />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleEChange} placeholder="Password" name='epassword' />
                                </div>
                                {/* <button onClick={handleForgotpass}>Forgot password</button> */}
                                <button onClick={handleESubmit} className="button solid">Sign in</button>
                            </>)}
                    </form>

                </div>
            </div>

            <div className="panels-containerr">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <Link to='/signup'><button className="button transparent" id="sign-up-button" >
                            Sign up
                        </button></Link>

                    </div>
                    <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login