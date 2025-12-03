import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ base_url }) => {
 useEffect(() => {
              document.title = "Login";
   },[]);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(base_url + "/login", { email, password });

            if (res.data.message === "success") {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("access_token", res.data.value.token);
                navigate("/dashboard");

            } else {
                setError("Server error");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }

    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh",borderRadius: "20px"
             }}
        >
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="text-center mb-4">Login</h4>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary" type="submit"
                                    
                                     style={{
                                            color: "#fff",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                        }}>
                                        &nbsp;&nbsp;&nbsp;<b>Login</b>&nbsp;&nbsp;&nbsp;
                                    </button>
                                </div>
                                <div className="col-md-5">

                                    <Link
                                        to="/Login-with-otp"
                                        className="btn btn-primary"
                                        style={{
                                            color: "#fff",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <b>Login With OTP</b>
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;
