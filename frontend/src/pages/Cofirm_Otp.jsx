import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Confirm_otp = ({ base_url_web }) => {


    const location = useLocation();
    const navigate = useNavigate();
    const [input, setIput] = useState({
        email: '',
        otp: ''
    })
    function onchangehandler(e) {
        setIput({ ...input, [e.target.name]: e.target.value });
    }


    function onsubmithandler(e) {
        e.preventDefault();

        const email_value = {
            "email": input.email,
            "otp": input.otp

        }


        axios.post(base_url_web + '/confirm-otp', email_value).then((res) => {
            if (res.data.status == "success") {
                localStorage.setItem("access_token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/dashboard");
            } else {
                navigate('/Login-with-otp', { state: { message: "Something Went Wrong", type: "otp_failed" } })
            }
        });
    }

    useEffect(() => {
        if (!location.state) return; // 👈 safely exit if null

        if (location.state?.type === "true") {
            toast.success(location.state.message);
        } else {
            toast.error(location.state.message)
        }
    }, [location.state])

    const otp_login_css = {
        marginTop: "-25px",
        cursor: "pointer"
    }

    function navigate_login_page() {
        navigate('/Login-with-otp')
    }

    return (
        <div className="otp_main_card">
            <div className="otp-card">
                <form method="POST" onSubmit={onsubmithandler}>
                    <div className="row">
                        <div className="col-md-11"></div>
                        <div className="col-md-1">
                            <h4 className="text-danger float-right" style={otp_login_css} onClick={navigate_login_page}>X</h4>

                        </div>
                    </div>

                    <div className=" " style={{ alignItems: "" }}>

                        <label className="text-left fw-semibold">E-Mail</label>

                        <input className="form-control" type="email" name="email" placeholder="Enter Your E-Mail Here"
                            onChange={onchangehandler} required
                        />
                    </div>
                    <div className="">
                        <label className="fw-semibold">OTP</label>
                        <input className="form-control" type="text" placeholder="Enter Your OTP Here"
                            onChange={onchangehandler} name="otp" required
                        />
                    </div>

                    <div className=" mt-2">
                        <button type="submit" className="otp-btn mt-3" >Login</button>
                    </div>
                </form>
                <div>
                    <ToastContainer
                        pauseOnHover
                        autoClose={3000}
                        position="top-right"
                    />
                </div>
            </div>
        </div>

    );
}

export default Confirm_otp;