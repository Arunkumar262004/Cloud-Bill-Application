import React from "react";

const UnderConstruction = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🚧</div>
        <h1 style={styles.title}>Page Under Construction</h1>
        <p style={styles.text}>
          We're working hard to bring you this feature.
          Please check back soon!
        </p>

        <div style={styles.loader}></div>

        <button
          style={styles.button}
          onClick={() => window.location.href = "/dashboard"}
        >
          Go Back Home
        </button>
      </div>

      {/* Loader animation style */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  icon: {
    fontSize: "50px",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "15px",
    color: "#333",
  },
  text: {
    color: "#666",
    marginBottom: "25px",
    fontSize: "14px",
  },
  loader: {
    margin: "20px auto",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #764ba2",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#764ba2",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default UnderConstruction;
