import './Login.css'
export default function Login() {
    return (
        <div className="login-wrapper">
            <h1>Log In</h1>
            <form method='post'>
                <div className='txt_field'>
                    <input type="text" required />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className='txt_field'>
                    <input type="password" required />
                    <span></span>
                    <label>Password</label>
                </div>
                <div class='pass'>Forgot Password?</div>
                <div>
                    <input type="submit" value='Login' />
                </div>
                <div className="signup_link">Not a member ?
                    <a href='#'>Signup</a>
                </div>
            </form>
        </div>
    )
}
