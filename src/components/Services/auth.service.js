import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};


const login = (userName, password) => {
    console.log('userName ===>', userName)
    console.log('password ===>', password)
    return axios
        .post(API_URL + "login", {
            userName,
            password,
        })
        .then((response) => {
            console.log('response ====>', response)
            if (response.data.userName) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;