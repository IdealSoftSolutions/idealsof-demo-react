import React from 'react'
import Form from "react-validation/build/form";
import AuthService from "./Services/auth.service";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const form = useRef();
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout()
        navigate("/login");
    }
    return (
        <Form onSubmit={handleLogout} ref={form}>
            <button type="logout" className="logout">Logout</button>
        </Form>
    )
}
