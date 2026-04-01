import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// Debug logging for API URL configuration
console.log("API URL Configuration Debug:");
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("Environment Mode:", import.meta.env.MODE);
console.log("Frontend URL:", window.location.origin);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  </StrictMode>,
)
