import React, { useState, useRef } from "react";
import './Login.css'
import AuthService from "../Services/auth.service";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";



export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        setUserName(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassWord(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('handleLogin called')
        form.current.validateAll();

        setMessage("");
        setLoading(true);
        if (checkBtn.current.context._errors.length === 0) {

            AuthService.login(userName, password).then(
                () => {
                    navigate("/authorize");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        }

    };

    return (
        <Form onSubmit={handleLogin} ref={form}>
            <div className="login-wrapper">
                <h1>Log In</h1>

                <div className='txt_field'>
                    <input
                        onChange={onChangeUsername} value={userName} type="text" required />
                    <span></span>
                    <label>userName</label>
                </div>
                <div className='txt_field'>
                    <input
                        value={password} onChange={onChangePassword} type="password" required />
                    <span></span>
                    <label>Password</label>
                </div>
                <div className='pass'>Forgot Password?</div>
                <button type="submit" className="submit">Submit</button>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                <div className="signup_link">Not a member ?
                    <a href='#'>Signup</a>
                </div>
            </div>
        </Form >
    )
}
