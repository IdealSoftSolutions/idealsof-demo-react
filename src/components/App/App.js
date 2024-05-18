import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Login from '../Login/Login';
import Home from '../Home/Home';
import AuthorizeApp from '../Services/AuthorizeApp';
import OAuthPopup from '../Services/OAuth2Popup'

export default function App() {
    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Routes>
                    <Route path='/authorize' element={<AuthorizeApp />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/callback' element={<OAuthPopup />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/preferences' element={<Preferences />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
