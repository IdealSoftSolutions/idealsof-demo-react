import { useNavigate } from "react-router-dom";
import { useState, useRef, intervalRef } from 'react';


export default function AuthorizeApp() {
    const POPUP_HEIGHT = 700;
    const POPUP_WIDTH = 600;
    const OAUTH_RESPONSE = 'react-use-oauth2-response';
    const CLIENT_ID = 'articles-client';
    const REDIRECT_URI = 'http://localhost:3000/callback'

    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [{ loading, error }, setUI] = useState({ loading: false, error: null });
    const [data, setData] = useState('')

    const popupRef = useRef();



    const validateToken = (payload) => {
        console.log('validating')
        navigate('/home')
    }
    const objectToQuery = (object) => {
        return new URLSearchParams(object).toString();
    };
    const formatExchangeCodeForTokenServerURL = (
        serverUrl,
        clientId,
        code,
        redirectUri
    ) => {
        return `${serverUrl}?${objectToQuery({
            grant_type: 'authorization_code',
            client_id: clientId,
            code: code,
            redirect_uri: redirectUri,
            code_verifier: 'grF7hFRwh4XKba0DuzozQ4ZYyngrhOui7JuWIoFL7gVqyvpqelWf-MHSqnDwiMRytvqcNpS3dGp5_7x5qQpRZSuHK0Y67CA9dnOmlwPONC1tijRI8Gn8fISOI_t-tRCI'
        })}`;
    };

    const cleanup = (
        intervalRef,
        popupRef,
        handleMessageListener
    ) => {
        if (intervalRef && intervalRef.current) clearInterval(intervalRef.current);
        closePopup(popupRef);
        window.removeEventListener('message', handleMessageListener);

    };

    const closePopup = (popupRef) => {
        popupRef.current?.close();
    };

    const openPopup = (url) => {
        // To fix issues with window.screen in multi-monitor setups, the easier option is to
        // center the pop-up over the parent window.
        const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
        const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
        return window.open(
            url,
            'OAuth2 Popup',
            `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
        );
    };
    const handleClick = () => {
        // 1. Init
        setUI({
            loading: true,
            error: null,
        });



        const url = 'http://auth-server:9000/oauth2/authorize?response_type=code&client_id=articles-client&redirect_uri=http://localhost:3000/callback&scope=openid&code_challenge=9QhqHm-jSGVb3XiCS-pXxATzG5Hok-f_gXS9aLM8Rcg&code_challenge_method=S256'
        const callbackUrl = 'http://localhost:3000/callback';
        const client_id = "public-client-react-app";
        const targetUrl = `http://auth-server:9000/oauth2/authorize?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${client_id}&scope=openid%20profile`;
        popupRef.current = openPopup(
            url
        );
        async function handleMessageListener(message) {
            try {
                const type = message && message.data && message.data.type;
                if (type === OAUTH_RESPONSE) {
                    const errorMaybe = message && message.data && message.data.error;
                    if (errorMaybe) {
                        setUI({
                            loading: false,
                            error: errorMaybe || 'Unknown Error',
                        });
                    } else {
                        const code = message && message.data && message.data.payload && message.data.payload.code;
                        const tokenUrl = formatExchangeCodeForTokenServerURL(
                            'http://auth-server:9000/oauth2/token',
                            CLIENT_ID,
                            code,
                            REDIRECT_URI
                        )
                        const response = await fetch(
                            tokenUrl,
                            {
                                method: "POST",
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    "Access-Control-Allow-Origin": "*",
                                    'mode': 'cors',
                                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                                }
                            }
                        );
                        if (!response.ok) {
                            setUI({
                                loading: false,
                                error: "Failed to exchange code for token",
                            });
                        } else {
                            const payload = await response.json();
                            setUI({
                                loading: false,
                                error: null,
                            });
                            setData(payload);
                            validateToken(payload)
                            // Lines above will cause 2 rerenders but it's fine for this tutorial :-)
                        }
                    }
                }
            } catch (genericError) {
                console.error(genericError);
                setUI({
                    loading: false,
                    error: genericError.toString(),
                });
            } finally {
                cleanup(intervalRef, popupRef, handleMessageListener);
            }
        }
        window.addEventListener('message', handleMessageListener);

        return () => {
            window.removeEventListener('message', handleMessageListener);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    };
    return (
        <div className="root">
            <div>
                <h1>Log in with Google</h1>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={handleClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 326667 333333"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            imageRendering="optimizeQuality"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            width={20}
                            height={20}
                        >
                            <path
                                d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                                fill="#4285f4"
                            />
                            <path
                                d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                                fill="#34a853"
                            />
                            <path
                                d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                                fill="#fbbc04"
                            />
                            <path
                                d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                                fill="#ea4335"
                            />
                        </svg>
                        Log in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}