import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../styles/input.css"
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
                        <form onSubmit={handleSubmit} id='sin'>
                        <div class="brutalist-container">

                            <input
                                placeholder="TYPE HERE"
                                class="brutalist-input smooth-type"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                            />
                            <label class="brutalist-label">Email</label>
                            </div>
                            <div class="brutalist-container">
                            <input
                                placeholder="TYPE HERE"
                                class="brutalist-input smooth-type"
                                type="password"
                                value={password}
                                    onChange={(e) => setPassword(e.target.value)} required
                            />
                            <label class="brutalist-label">Password</label>
                            </div>
                            
                            <div className="field button-field">
                           
                        <button   >Login</button>
                    </div>
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
