import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ base_url }) => {
    useEffect(() => {
        document.title = "Register";
    }, []);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post(base_url + "/register", {

                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword

            });

            if (res.data.message === "success") {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("access_token", res.data.value.token);
                localStorage.setItem('user_email', email);

                navigate("/dashboard");
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                setError("Server error");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            <style>{`
        .login-container {
          transition: all 0.3s ease;
        }
        
        .floating-shape {
          position: absolute;
          opacity: 0.1;
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(5deg); }
          66% { transform: translateY(30px) rotate(-5deg); }
        }
        
        .input-modern {
          border: 2px solid #e0e7ff;
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
        }
        
        .input-modern:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          outline: none;
        }
        
        .btn-primary-modern {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-modern:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
        }
        
        .btn-primary-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .btn-primary-modern:hover::before {
          left: 100%;
        }
        
        .social-login-btn {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px;
          background: white;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .social-login-btn:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .card-modern {
          border-radius: 24px;
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          background: white;
        }
        
        .password-toggle {
          cursor: pointer;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: color 0.2s;
        }
        
        .password-toggle:hover {
          color: #4f46e5;
        }
        
        .feature-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50px;
          padding: 8px 20px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .side-image {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }
        
        .side-image::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: drift 60s linear infinite;
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>

            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    {/* Left Side - Illustration/Branding */}
                    <div className="col-lg-6 d-none d-lg-flex side-image align-items-center justify-content-center position-relative">
                        {/* Decorative shapes */}
                        <div className="floating-shape" style={{ top: '10%', left: '10%', width: '100px', height: '100px', background: 'white', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
                        <div className="floating-shape" style={{ bottom: '15%', right: '15%', width: '150px', height: '150px', background: 'white', borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%', animationDelay: '5s' }}></div>
                        <div className="floating-shape" style={{ top: '40%', left: '20%', width: '80px', height: '80px', background: 'white', borderRadius: '50%', animationDelay: '10s' }}></div>

                        <div className="text-center text-white px-5" style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                            <div className="mb-5">
                                <i className="bi bi-rocket-takeoff" style={{ fontSize: '80px', marginBottom: '24px', display: 'block' }}></i>
                                <h1 className="display-4 fw-bold mb-4">Start Your Journey</h1>
                                <p className="lead mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    Join thousands of users who trust our platform for secure and seamless access to their digital workspace.
                                </p>
                            </div>

                            {/* Feature highlights */}
                            {/* <div className="row g-3 text-start">
                                <div className="col-12">
                                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                                        <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                                            <i className="bi bi-lightning-charge-fill" style={{ fontSize: '24px' }}></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Instant Access</div>
                                            <small className="opacity-75">Login in seconds</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                                        <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                                            <i className="bi bi-shield-check" style={{ fontSize: '24px' }}></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Secure & Private</div>
                                            <small className="opacity-75">End-to-end encryption</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                                        <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                                            <i className="bi bi-people-fill" style={{ fontSize: '24px' }}></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Trusted by Millions</div>
                                            <small className="opacity-75">Join our global community</small>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="col-lg-6 d-flex align-items-center justify-content-center p-2 p-md-2">
                        <div className="w-100" style={{ maxWidth: '480px' }}>
                            {/* Mobile Logo */}
                            <div className="text-center mb-2 d-lg-none">
                                <i className="bi bi-rocket-takeoff text-primary" style={{ fontSize: '36px' }}></i>
                            </div>

                            <div className="card-modern p-2 p-md-3">
                                <Link to={'/login'} className="text-danger float-end" style={{ textDecoration: 'none',fontSize:'20px',fontWeight:'9px' }}>X</Link>
                                <div className="text-center mb-2 mt-4">
                                    <span className="feature-badge" style={{ padding: '8px 15px', fontSize: '13px', marginBottom: '8px' }}>
                                        <i className="bi bi-shield-lock-fill me-1"></i>
                                        Register Account
                                    </span>

                                </div>

                                {/* Error Alert */}
                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center mb-4" style={{ borderRadius: '12px', border: 'none', background: '#fee2e2' }}>
                                        <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                                        <span className="text-danger small">{error}</span>
                                    </div>
                                )}


                                <div className="position-relative mb-4">
                                    <hr className="my-0" />
                                    <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
                                    </span>
                                </div>

                                <form onSubmit={handleLogin}>
                                    {/* name */}
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label fw-semibold small mb-2" style={{ color: '#374151' }}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control input-modern"
                                            id="name"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold small mb-2" style={{ color: '#374151' }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control input-modern"
                                            id="email"
                                            placeholder="you@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold small mb-2" style={{ color: '#374151' }}>
                                            Password
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control input-modern"
                                                id="password"
                                                placeholder="Enter your password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                style={{ paddingRight: '45px' }}
                                            />
                                            <i
                                                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} password-toggle`}
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold small mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control input-modern"
                                            placeholder="Confirm password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>


                                    <button
                                        type="submit"
                                        className="btn btn-primary-modern w-100 text-white mb-3"
                                        disabled={loading}
                                        style={{ fontSize: '16px' }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                Register
                                                <i className="bi bi-arrow-right ms-2"></i>
                                            </>
                                        )}
                                    </button>


                                </form>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;