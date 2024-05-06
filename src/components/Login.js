import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let result = await fetch('http://localhost:5000/login', {
                method: "post",
                body: JSON.stringify({  
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.warn(result);

            if (result.token) { // Check if token exists in the result
                sessionStorage.setItem('session', result.token);
                alert(result.message);
                console.log(sessionStorage.getItem('session'));
                // Navigate to another route after successful login
                window.location.href = '/'; 
            } else {
                alert(result.message);
            }
        } catch {
            alert("Check Login Data");
        }
    };

    return (
        <>
            <div className="form">
                <div className="tab-content">
                    <div id="signup">
                        <h1>Welcome Back!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="field-wrap">
                                <input type="email" placeholder="Email" className="input"  value={email}
                                    onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="field-wrap">
                                <input type="password" placeholder="Password" className="password"   value={password}
                                    onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <p className="forgot"><a href="#">Forgot Password?</a></p>
                            <button className="button button-block">Log In</button>
                            <div className="form-link">
                                <span>No account? Make one. <a href="/signup" className="link login-link">signup</a></span>
                            </div>
                        </form>
                    </div>
                    <div id="login"></div>
                </div>
            </div>
        </>
    );
}

export default Login;
