
import { useState } from 'react'
import GlitchingButton from './glitchingButton';

function UserS() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [house_Nr, setHouse_Nr] = useState('');
    const [pLZ, setPLZ] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPass, setcheckPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(password)) {
                setErrorMessage('Password must be at least 8 characters long and contain at least one number and one special character.');
                return;
            }

            if (password !== checkPass) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            let response = await fetch('http://localhost:5000/register', {
                method: "POST",
                body: JSON.stringify({
                    firstname, lastname, country, city, house_Nr, pLZ, email, password, phoneNumber,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let result = await response.json();
            if (result) {
                alert("Data saved successfully");
            } else {
                alert("Check Data");
            }
        } catch {
            alert("Check Data");
        }
    };


    return (
        <>
        <div class="form" id="f">

        <h1 >Sign Up for Free</h1>
        
      
        <div class="tab-content">
          <div id="signup">
      
            <form onSubmit={handleSubmit}>
      
              <div class="top-row">
              <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <label class="brutalist-label">Firstname</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                <label class="brutalist-label">Lastname</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <label class="brutalist-label">Country</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <label class="brutalist-label">City</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={house_Nr}
                    onChange={(e) => setHouse_Nr(e.target.value)}
                    required
                />
                <label class="brutalist-label">Nr°</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={pLZ}
                    onChange={(e) => setPLZ(e.target.value)}
                    required
                />
                <label class="brutalist-label">PLZ</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <label class="brutalist-label">Phone number</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label class="brutalist-label">Email</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label class="brutalist-label">Password</label>
            </div>

            <div class="brutalist-container">
                <input
                    placeholder="TYPE HERE"
                    class="brutalist-input smooth-type"
                    type="password"
                    value={checkPass}
                    onChange={(e) => setcheckPass(e.target.value)}
                    required
                />
                <label class="brutalist-label">Retype password</label>
            </div>
            </div>

              {errorMessage && <p  style={{ color: 'red' }}>{errorMessage}</p>}
              
              <div className="field button-field">
                        <button   >Signup</button>
                    </div>

            </form>
            <div className="form-link">
                    <span>Already have an account? <a href="/login" className="link login-link">Login</a></span>
                </div>
          </div>
      
          <div id="login">
         
      
          </div>
      
        </div>
      
      </div> 


       
        </>
    );
}
 
export default UserS;