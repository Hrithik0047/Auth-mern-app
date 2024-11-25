import { Navigate, Route, Routes } from 'react-router-dom'; //Route functionality is coming from here
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //when user log ins and then we render runtime component or we will return to login
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (

    // THis is where we have created routes
    <div className="App">

        {/* we will call refreshhandler from the refreshhandler.js  */}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* handlin base route, redirect to whichever page you want using Navigate  */}
        <Route path='/' element={<Navigate to="/login" />} />

        { /*defining the path and the component we wish to render, these will automatically import that components on top of file*/ }
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* passing home component in private route */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
