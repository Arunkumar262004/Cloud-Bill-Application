import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom"; // ✅ Import these
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Cloudbill-app">
    <App />
  </BrowserRouter>
)