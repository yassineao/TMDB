import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import getToken from './api/getTokenU';
import './styles/navigation.css';
import './styles/Nbar.css';
import RouteComponent from './components/Router';
import NavBar from './components/navBar';
import Footer from './components/footer';
function App() {
  const [userData, setUserData] = useState(null); // State to hold user data

  const logout = () => {
    // Clear session storage or cookies
    sessionStorage.removeItem('session');
    // Redirect to the login page or any other desired page
    window.location.href = '/login'; // Redirect to the login page after logout
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the getToken function to fetch user data
        const user = await getToken();
        setUserData(user); // Set user data to state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Run the effect only once when the component mounts

  return (
    <div className="App">
      <Router>
        <NavBar userData={userData} logout={logout} />
        <RouteComponent />
        <Footer />
      </Router>

    </div>
  );
}

export default App;
