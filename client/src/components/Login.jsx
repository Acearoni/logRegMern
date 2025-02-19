import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, Navigate } from 'react-router-dom';


const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [errors, setErrors] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const loginUser = { email, password }
        axios.post('http://localhost:8000/api/loginUser', loginUser , { withCredentials: true })
            .then((res) => {
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.message)
            })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={submitHandler}>
                {
                    errors.length > 0?
                    <p>{errors}</p>:
                    null
                }
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
                <br/>
                <Link to={'/'}> Sign Up</Link>
            </form>
        </div>
    );
}

export default Login;