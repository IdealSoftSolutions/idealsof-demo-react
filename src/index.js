import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import Footer from './components/footer/Footer';
import Header from './components/Header/Header';


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Header />
        <App />
        <Footer />
    </React.StrictMode>
);
