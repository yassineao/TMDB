
import { useState } from 'react'
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try{  e.preventDefault();
          let result = await fetch(
          'http://localhost:5000/login', {
              method: "post",
              body: JSON.stringify({  
                  email,
                  password,
               }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          result = await result.json();
          console.warn(result);
          if (result) {
              alert(result.message);
          }
          else{
              alert(result.message);
          }}
          catch{
              alert("Check Login Data");
          }
      }


    return (
        <><div class="form">

        <ul class="tab-group">
        </ul>
      
        <div class="tab-content">
          <div id="signup">
           
            <h1>Welcome Back!</h1>
      
      <form onSubmit={handleSubmit}>

        <div class="field-wrap">
          <label>
          </label>
          <input type="email" placeholder="Email" className="input"  value={email}
      onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div class="field-wrap">
          <label>
          </label>
          <input type="text" placeholder="Password" className="password"   value={password}
      onChange={(e) => setPassword(e.target.value)} required/>
        </div>

        <p class="forgot"><a href="#">Forgot Password?</a></p>

        <button class="button button-block" >Log In</button>
        <div className="form-link">
                    <span>No account? Make one. <a href="/signup" className="link login-link">signup</a></span>
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
 
export default Login;