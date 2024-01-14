import { useState } from "react";
import './Register.css'
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [ServerError, setServerError] = useState('')
    const navigate = useNavigate()

    async function onSubmitRegister() {
        try {
        const res = await
        fetch('https://transaction-api-3caf.onrender.com/v3/user/register', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
         password: Password,
         username: Username
        })
    })
    const data = await res.json();
    if(data.username === Username) {
        props.loadUser(data)
        props.routeChange('loggedin')
        navigate('/')
    }else {
        setServerError(data)
    }
    } catch (error) {
        setServerError (error)
        }
    }

    return (
            <div className="register-container">
                <h1>Register</h1>
                <p className="error-display">{ServerError}</p>
                <div className="form-container">
                    <input className="form-label"
                    type="text"
                    name='username'
                    placeholder="username"
                    onChange={(event) => {setUsername(event.target.value)}}/>
                </div>
                <div className="form-container">
                    <input className="form-label"
                    type='password'
                    name='password'
                    placeholder="password"
                    onChange={(event) => {setPassword(event.target.value)}}/>
                </div>
                <div className="enter">
                    <input type='button'
                    value='register'
                    name='submit'
                    onClick={onSubmitRegister}/>
                </div>
                <Link style={{textDecoration: 'none'}} to='/login'><label>Login</label></Link>
            </div>
    );
};

export default Register;