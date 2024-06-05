import { useState, useEffect } from 'react'

function Modify() {

    const [userData, setUserData] = useState(null); // State to hold user data
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/protected', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('session')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const data = await response.json();
                setUserData(data.user); // Set user data to state
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Call the async function to fetch data
    }, []); // Run the effect only once when the component mounts

    useEffect(() => {
        if (userData) {
            setFirstname(userData.firstname);
            setLastname(userData.lastname);
            setCountry(userData.country);
            setCity(userData.city);
            setHouse_Nr(userData.house_Nr);
            setPLZ(userData.pLZ);
            setPhoneNumber(userData.phoneNumber);
            setEmail(userData.email);
            // Password and checkPass should not be pre-filled for security reasons
        }
    }, [userData]); // Update the input fields when userData changes

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const result = await fetch(
                'http://localhost:5000/profile', {
                method: "PUT", // Change method to PUT
                body: JSON.stringify({
                    firstname,
                    lastname,
                    country,
                    city,
                    house_Nr,
                    pLZ,
                    email,
                    phoneNumber,
                }),
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('session')}`,
                    'Content-Type': 'application/json',// Include authorization header
                }
            });
    
            if (result.ok) {
                alert("Data saved successfully");
                const data = await result.json();
                // Update session storage with the new token
                sessionStorage.setItem('session', data.token);
            } else {
                const errorData = await result.json();
                alert(errorData.message || "Failed to update data");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <><div class="form">

        <ul class="tab-group">
        </ul>
      
        <div class="tab-content">
          <div id="signup">
            <h1>Sign Up for Free</h1>
      
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



              
              <div className="field button-field">
                        <button   >Signup</button>
                    </div>

            </form>
            
          </div>
      
          <div id="login">
         
      
          </div>
      
        </div>
      
      </div> 


       
        </>
    );
}
 
export default Modify;