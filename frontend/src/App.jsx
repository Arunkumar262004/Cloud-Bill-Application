import { useEffect, useState } from 'react'

import './App.css'
import { Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom'
import Register_page from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Index_page from './Index_page'
import Bill_My from './Bill/Bill'
import Sales_add_form from './Bill/Sales-add';
import Sales_my from './Bill/Sales-my';
import Sales_editform from './Bill/Sales-edit';
import Stock_my from './Bill/Stock-my';
import Stock_add_form from './Bill/Stock-add';
import Stock_editform from './Bill/Stock.edit';
import Login_with_otp from './pages/Login-with-otp';
import Confirm_otp from './pages/Cofirm_Otp';
import Contact_my from './Contact/Contact_my';
import Contact_add from './Contact/Contact_add';
import Contact_edit from './Contact/Contact_edit';




var base_url = "http://127.0.0.1:8000/api";
var base_url_web = "http://127.0.0.1:8000/api";
var base_url_image = "http://127.0.0.1:8000";


function App() {

  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("access_token"));

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setAuthenticated(false);
      navigate('/login');
    } else {
      setAuthenticated(true);
    }

  }, [])

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login base_url={base_url} />} />
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/Login-with-otp' element={<Login_with_otp base_url_web={base_url_web} />} />
        <Route path='/Confirm-otp' element={<Confirm_otp base_url_web={base_url_web} />} />

        {authenticated && (
          <Route element={<Dashboard base_url={base_url} />}>
            <Route path='/dashboard' element={<Index_page base_url={base_url} />} />
            <Route path='/Bill' element={<Bill_My />} />
            <Route path='/sales-my' element={<Sales_my base_url={base_url} />} />
            <Route path='/sales-add' element={< Sales_add_form base_url={base_url} />} />
            <Route path='/sales-edit/:id' element={< Sales_editform base_url={base_url} />} />
            <Route path='/stock-my' element={<Stock_my base_url={base_url} />} />
            <Route path='/stock-add' element={<Stock_add_form base_url={base_url} />} />
            <Route path='/stock-edit/:id' element={<Stock_editform base_url={base_url} />} />

            <Route path='/contact' element={<Contact_my base_url={base_url}/>} />
            <Route path='/contact-add' element={<Contact_add base_url={base_url}/>} />
            <Route path='/contact-edit/:id' element={<Contact_edit base_url={base_url} />} />

          </Route>
        )}


      </Routes>
    </>
  )
}

export default App
