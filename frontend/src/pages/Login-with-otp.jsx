import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login_with_otp = ({ base_url_web }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState({ email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Login with OTP";
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const email_value = { email: input.email };

        try {
            const res = await axios.post(base_url_web + '/send-otp', email_value);
            if (res.data.status === "success") {

                              localStorage.setItem("otp_email", input.email);

                navigate('/Confirm-otp', { 
                    state: { message: "OTP sent to your email successfully", type: "true" } 
                });
            } else {
                setError("Email not registered");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!location.state) return;
        if (location.state?.type === "otp_failed") {
            toast.success(location.state.message);
        } else {
            toast.error(location.state.message);
        }
    }, [location.state]);

    return (
        <div className="min-vh-100 d-flex" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            <style>{`
                .login-container { transition: all 0.3s ease; }
                
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
                
                .card-modern {
                    border-radius: 24px;
                    border: none;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    background: white;
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
                
                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 24px;
                    background: none;
                    border: none;
                    font-size: 28px;
                    color: #6b7280;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .close-btn:hover {
                    color: #dc2626;
                    background: rgba(220, 38, 38, 0.1);
                }
                
                .alert-danger-custom {
                    border-radius: 12px;
                    border: none;
                    background: #fee2e2;
                    color: #dc2626;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 16px;
                    margin-bottom: 20px;
                    font-size: 14px;
                }
            `}</style>

            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    {/* Left Side - Illustration/Branding */}
                    <div className="col-lg-6 d-none d-lg-flex side-image align-items-center justify-content-center position-relative">
                        <div className="floating-shape" style={{ top: '10%', left: '10%', width: '100px', height: '100px', background: 'white', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
                        <div className="floating-shape" style={{ bottom: '15%', right: '15%', width: '150px', height: '150px', background: 'white', borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%', animationDelay: '5s' }}></div>
                        <div className="floating-shape" style={{ top: '40%', left: '20%', width: '80px', height: '80px', background: 'white', borderRadius: '50%', animationDelay: '10s' }}></div>

                        <div className="text-center text-white px-5" style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                            <div className="mb-5">
                                <i className="bi bi-envelope-check" style={{ fontSize: '80px', marginBottom: '24px', display: 'block' }}></i>
                                <h1 className="display-4 fw-bold mb-4">OTP Login</h1>
                                <p className="lead mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    Secure login with one-time password delivered straight to your inbox.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - OTP Form */}
                    <div className="col-lg-6 d-flex align-items-center justify-content-center p-2 p-md-2">
                        <div className="w-100" style={{ maxWidth: '480px' }}>
                            <div className="card-modern p-4 p-md-5 position-relative">
                                <button 
                                    className="close-btn" 
                                    onClick={() => navigate('/')}
                                    aria-label="Close"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>

                                <div className="text-center mb-4">
                                    <span className="feature-badge">
                                        <i className="bi bi-envelope-fill me-2"></i>
                                        OTP Login
                                    </span>
                                    <h2 className="fw-bold mb-2" style={{ color: '#1f2937', fontSize: '32px' }}>Verify Email</h2>
                                    <p className="text-muted mb-0">Enter your registered email to receive OTP</p>
                                </div>

                                {/* Error Alert */}
                                {error && (
                                    <div className="alert-danger-custom">
                                        <i className="bi bi-exclamation-triangle-fill"></i>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={onSubmitHandler}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-semibold small mb-2" style={{ color: '#374151' }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control input-modern w-100"
                                            placeholder="you@example.com"
                                            value={input.email}
                                            onChange={onChangeHandler}
                                            required
                                            disabled={loading}
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
                                                Sending OTP...
                                            </>
                                        ) : (
                                            <>
                                                Send OTP
                                                <i className="bi bi-arrow-right ms-2"></i>
                                            </>
                                        )}
                                    </button>

                                    <Link
                                        to="/"
                                        className="btn w-100 social-login-btn d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                                        style={{ color: '#374151' }}
                                    >
                                        <i className="bi bi-box-arrow-in-left"></i>
                                        <span className="fw-semibold">Back to Password Login</span>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                pauseOnHover
                autoClose={3000}
                position="top-right"
            />
        </div>
    );
};

export default Login_with_otp;
