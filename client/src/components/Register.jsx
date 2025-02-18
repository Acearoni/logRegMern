import React, { useState } from 'react';
import axios from 'axios';
// import useNavigate from 'react-router-dom';


const Register = (props) => {
    // const navigate = useNavigate() //destructured
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const submitHandler = (e) => {
        console.log('Submitted')
        e.preventDefault()
        const newUser = {firstName, lastName, email, password, confirmPassword}
        axios.post('http://localhost:8000/api/registerUser', newUser, {withCredentials:true})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>Register User</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Register;