import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import React from 'react'
import { useNavigate } from "react-router-dom";


export default function PrivateRoutes() {
    const [ok, setOk] = useState(false);
    const storedIsAuthorised = localStorage.getItem('isAuthorised');
    const navigate = useNavigate();

    useEffect(() => {
        if (storedIsAuthorised) {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [storedIsAuthorised])

    return ok ? < Outlet /> : navigate("/login");
}
