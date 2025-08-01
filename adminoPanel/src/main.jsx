
import { createRoot } from 'react-dom/client'
import './index.css'   
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import 'bootstrap-icons/font/bootstrap-icons.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
  </BrowserRouter>
)
