import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Dashboard = ({ base_url }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const getInitials = (name) => {
    if (!name) return "";

    return name
      .replace(/"/g, "") 
      .trim()
      .split(" ")
      .filter(word => word.length > 0)
      .map(word => word[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };


  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  function Log_out_session() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  const navItems = [
    { path: "/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
    { path: "/Bill", icon: "bi-receipt-cutoff", label: "Billing" },
    { path: "/contact", icon: "bi-person-vcard-fill", label: "Contacts" },
    { path: "/analytics", icon: "bi-graph-up", label: "Analytics" },
  ];

  const [get_email, set_email] = useState(null);
  useEffect(() => {
    let storedUser = '';
    try {
      const userData = localStorage.getItem('user');
      storedUser = userData ? JSON.parse(userData) : '';
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      storedUser = '';
    }

    set_email(storedUser?.value); // only store value object
  }, [])
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden"
    }}>
      {/* Minimal Icon Sidebar */}
      <aside
        style={{
          width: "72px",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          position: "relative",
          zIndex: 10,
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.12)"
        }}
      >
        {/* Logo */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)"
        }}>
          <i className="bi bi-cloud-lightning-fill" style={{ color: "#fff", fontSize: "24px" }}></i>
        </div>

        {/* Navigation Icons */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                margin: "0 auto",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                background: location.pathname === item.path
                  ? "rgba(102, 126, 234, 0.15)"
                  : "transparent",
                border: location.pathname === item.path
                  ? "2px solid rgba(102, 126, 234, 0.4)"
                  : "2px solid transparent",
                position: "relative"
              }}
            >
              <i
                className={`bi ${item.icon}`}
                style={{
                  fontSize: "22px",
                  color: location.pathname === item.path ? "#667eea" : "#94a3b8",
                  transition: "color 0.3s ease"
                }}
              ></i>
              {location.pathname === item.path && (
                <div style={{
                  position: "absolute",
                  left: "-12px",
                  width: "4px",
                  height: "24px",
                  background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "0 4px 4px 0"
                }}></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={Log_out_session}
          title="Logout"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "2px solid rgba(239, 68, 68, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <i className="bi bi-box-arrow-right" style={{ fontSize: "20px", color: "#ef4444" }}></i>
        </button>
      </aside>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Top Header Bar */}
        <header style={{
          height: "72px",
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          flexShrink: 0,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
        }}>
          {/* Left - Title */}
          <div>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              letterSpacing: "-0.5px"
            }}>
              CloudBill Pro
            </h1>
            <p style={{
              fontSize: "13px",
              color: "#64748b",
              margin: "2px 0 0 0"
            }}>
              Manage your business efficiently
            </p>
          </div>

          {/* Right - User Account Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Search */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              background: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              minWidth: "280px"
            }}>
              <i className="bi bi-search" style={{ color: "#94a3b8", fontSize: "16px" }}></i>
              <input
                type="text"
                placeholder="Search anything..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#1e293b",
                  fontSize: "14px",
                  width: "100%",
                  fontWeight: "500"
                }}
              />
              <kbd style={{
                padding: "2px 6px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                fontSize: "11px",
                color: "#64748b",
                fontFamily: "monospace"
              }}>⌘K</kbd>
            </div>

            {/* Notifications */}
            <button style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}>
              <i className="bi bi-bell" style={{ fontSize: "20px", color: "#64748b" }}></i>
              <span style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "10px",
                height: "10px",
                background: "#ef4444",
                borderRadius: "50%",
                border: "2px solid #fff",
                animation: "pulse 2s infinite"
              }}></span>
            </button>

            {/* Divider */}
            <div style={{
              width: "1px",
              height: "32px",
              background: "#e2e8f0"
            }}></div>

            {/* User Account Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 16px 8px 8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}>
                  {getInitials(get_email?.name ? get_email?.name : localStorage.getItem('user'))}
                </div>

                {/* User Info */}
                <div style={{ textAlign: "left" }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#1e293b",
                    lineHeight: "1.2"
                  }}>
                    {get_email?.name ? get_email?.name : localStorage.getItem('user')}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: "1.4"
                  }}>
                    Administrator
                  </div>
                </div>

                {/* Dropdown Icon */}
                <i
                  className="bi bi-chevron-down"
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    transition: "transform 0.3s",
                    transform: showUserMenu ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                ></i>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div style={{
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  width: "280px",
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden",
                  zIndex: 100
                }}>
                  {/* User Info Header */}
                  <div style={{
                    padding: "20px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px"
                    }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "18px"
                      }}>
                        {getInitials(get_email?.name ? get_email?.name : localStorage.getItem('user'))}

                      </div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "700" }}>{get_email?.name ? get_email?.name : localStorage.getItem('user')}</div>
                        <div style={{ fontSize: "12px", opacity: 0.9 }}>{get_email?.email}</div>
                      </div>
                    </div>
                    <div style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.5px"
                    }}>
                      ADMINISTRATOR
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: "8px" }}>
                    <Link to="/profile" style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: "#475569",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}>
                      <i className="bi bi-person-circle" style={{ fontSize: "18px" }}></i>
                      <span>My Profile</span>
                    </Link>

                    <Link to="/settings" style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: "#475569",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}>
                      <i className="bi bi-gear" style={{ fontSize: "18px" }}></i>
                      <span>Account Settings</span>
                    </Link>

                    <Link to="/billing" style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: "#475569",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}>
                      <i className="bi bi-credit-card" style={{ fontSize: "18px" }}></i>
                      <span>Billing & Plans</span>
                    </Link>

                    <Link to="/help" style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: "#475569",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}>
                      <i className="bi bi-question-circle" style={{ fontSize: "18px" }}></i>
                      <span>Help & Support</span>
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div style={{
                    borderTop: "1px solid #f1f5f9",
                    padding: "8px"
                  }}>
                    <button onClick={Log_out_session} style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      color: "#ef4444",
                      fontSize: "14px",
                      fontWeight: "600",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s"
                    }}>
                      <i className="bi bi-box-arrow-right" style={{ fontSize: "18px" }}></i>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Full Screen Content Area */}
        <main style={{
          flex: 1,
          overflow: "auto",
          padding: "32px 40px",
          background: "#f8fafc"
        }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        a:hover {
          background: #f1f5f9 !important;
        }
        
        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
        
        aside a:hover {
          background: rgba(102, 126, 234, 0.1) !important;
          transform: translateX(2px);
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;