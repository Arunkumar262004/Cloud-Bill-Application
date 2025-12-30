import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Confirm_otp = ({ base_url_web }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        document.title = "Validate OTP";

        // Get email from localStorage that was stored during OTP send
        const storedEmail = localStorage.getItem("otp_email");
        if (storedEmail) {
            setEmail(storedEmail);
        }

        // Handle location state messages
        if (!location.state) return;
        
        if (location.state?.type === "true") {
            toast.success(location.state.message);
        } else {
            toast.error(location.state.message);
        }
    }, [location.state]);

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last character
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        // Focus last filled input or next empty one
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const onsubmithandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const otpValue = otp.join("");

        const email_value = {
            email: email,
            otp: otpValue
        };

        try {
            const res = await axios.post(base_url_web + '/confirm-otp', email_value);
            
            if (res.data.status === "success") {
                localStorage.setItem("access_token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                // Clear the stored email after successful login
                localStorage.removeItem("otp_email");
                navigate("/dashboard");
            } else {
                navigate('/Login-with-otp', { 
                    state: { message: "Something Went Wrong", type: "otp_failed" } 
                });
            }
        } catch (err) {
            console.error(err);
            navigate('/Login-with-otp', { 
                state: { message: "Something Went Wrong", type: "otp_failed" } 
            });
        } finally {
            setLoading(false);
        }
    };

    const navigate_login_page = () => {
        navigate('/Login-with-otp');
    };

    return (
        <div className="min-vh-100 d-flex" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            <style>{`
                .otp-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .otp-modal-card {
                    background: white;
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    max-width: 500px;
                    width: 90%;
                    padding: 40px;
                    position: relative;
                    animation: slideUp 0.3s ease;
                }

                @keyframes slideUp {
                    from { 
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to { 
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #f3f4f6;
                    border: none;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: #6b7280;
                    font-size: 20px;
                }

                .close-btn:hover {
                    background: #fee2e2;
                    color: #dc2626;
                    transform: rotate(90deg);
                }

                .otp-input-container {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    margin: 30px 0;
                }

                .otp-input {
                    width: 50px;
                    height: 56px;
                    border: 2px solid #e0e7ff;
                    border-radius: 12px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: 600;
                    color: #1f2937;
                    transition: all 0.3s ease;
                    background: white;
                }

                .otp-input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
                    outline: none;
                    transform: scale(1.05);
                }

                .otp-input:not(:placeholder-shown) {
                    border-color: #667eea;
                    background: #f0f4ff;
                }

                .email-display {
                    background: #f3f4f6;
                    border-radius: 12px;
                    padding: 12px 16px;
                    text-align: center;
                    color: #374151;
                    font-weight: 500;
                    margin-bottom: 24px;
                    font-size: 14px;
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
                    width: 100%;
                    color: white;
                    cursor: pointer;
                }

                .btn-primary-modern:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
                }

                .btn-primary-modern:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .feature-badge {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50px;
                    padding: 8px 20px;
                    color: white;
                    font-size: 13px;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                }

                .resend-link {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .resend-link:hover {
                    color: #764ba2;
                    text-decoration: underline;
                }

                @media (max-width: 576px) {
                    .otp-modal-card {
                        padding: 30px 20px;
                    }

                    .otp-input-container {
                        gap: 8px;
                    }

                    .otp-input {
                        width: 42px;
                        height: 48px;
                        font-size: 20px;
                    }
                }
            `}</style>

            <div className="otp-modal-overlay">
                <div className="otp-modal-card">
                    <button className="close-btn" onClick={navigate_login_page} type="button">
                        <i className="bi bi-x"></i>
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <span className="feature-badge">
                            <i className="bi bi-shield-check me-2"></i>
                            OTP Verification
                        </span>
                        <h2 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1f2937', fontSize: '28px' }}>
                            Verify Your Identity
                        </h2>
                        <p style={{ color: '#6b7280', marginBottom: 0 }}>
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>

                    <form method="POST" onSubmit={onsubmithandler}>
                        {/* Display stored email */}
                        {email && (
                            <div className="email-display">
                                <i className="bi bi-envelope-fill me-2"></i>
                                {email}
                            </div>
                        )}

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '8px', textAlign: 'center', color: '#374151' }}>
                                Enter OTP Code
                            </label>
                            <div className="otp-input-container">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className="otp-input"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        placeholder="·"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary-modern"
                            disabled={loading}
                            style={{ fontSize: '16px' }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Login
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </>
                            )}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <p style={{ fontSize: '14px', marginBottom: 0, color: '#6b7280' }}>
                                Didn't receive the code?{" "}
                                <span className="resend-link" onClick={navigate_login_page}>
                                    Resend OTP
                                </span>
                            </p>
                        </div>
                    </form>

                    <ToastContainer
                        pauseOnHover
                        autoClose={3000}
                        position="top-right"
                    />
                </div>
            </div>
        </div>
    );
};

export default Confirm_otp;