import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import 'react-toastify/ReactToastify.css' //this will import css for react globally



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //We will be passing Browser ROuter as a child, and pass App in it, as App will have our all functionalites like login, signup, etc.
    
  <React.StrictMode>
    
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
