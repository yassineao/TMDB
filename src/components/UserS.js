
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
                <div class="field-wrap">
                  <label>
                    
                  </label>
                  <input type="text" placeholder="Firstname" className="input"   value={firstname}
      onChange={(e) => setFirstname(e.target.value)} required autocomplete="off"/>
                </div>
      
                <div class="field-wrap">
                  <label>
                  </label>
                  <input type="text" placeholder="Lastname" className="input"   value={lastname}
      onChange={(e) => setLastname(e.target.value)} required autocomplete="off"/>
                </div>
              </div>
      
              <div class="field-wrap">
                <label>
                </label>
                <input type="text" placeholder="Country" className="input"   value={country}
      onChange={(e) => setCountry(e.target.value)} required/>
              </div>
      
              <div class="field-wrap">
                <label>
                </label>
                <input type="text" placeholder="city" className="input"   value={city}
      onChange={(e) => setCity(e.target.value)} required/>
              </div>
              <div class="top-row">
              <div class="field-wrap">
                <label>
                </label>
                <input type="text" placeholder="Nr°" className="input"   value={house_Nr}
      onChange={(e) => setHouse_Nr(e.target.value)} required/>
              </div>
      
              <div class="field-wrap">
                <label>
                </label>
                <input type="text" placeholder="PLZ" className="input"   value={pLZ}
      onChange={(e) => setPLZ(e.target.value)} required/>
              </div>
              </div>
              <div class="field-wrap">
                <label>
                </label>
                <input type="text" placeholder="Phone number" className="input"   value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)} required/>
              </div>

              <div class="field-wrap">
                <label>
                </label>
                <input type="email" placeholder="Email" className="input"  value={email}
      onChange={(e) => setEmail(e.target.value)} required/>
              </div>

              <div class="field-wrap">
                <label>
                </label>
                <input type="password" placeholder="Password" className="password"   value={password}
      onChange={(e) => setPassword(e.target.value)} required/>
              </div>

              <div class="field-wrap">
                <label>
                </label>
                <input type="password" placeholder="Retype password" className="password"  value={checkPass}
      onChange={(e) => setcheckPass(e.target.value)} required/>
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