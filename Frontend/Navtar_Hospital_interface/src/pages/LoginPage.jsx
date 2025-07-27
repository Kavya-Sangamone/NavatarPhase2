import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();  // ✅ Move it here

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      console.log("Login Successful");

      try {
        const res = await fetch("http://localhost:8000/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: tokenResponse.access_token,
          }),
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log("Authorized User:", data);

        onLogin(data);  // ✅ Inform App.jsx that login succeeded
        localStorage.setItem("admin", JSON.stringify(data));
        navigate("/dashboard");  // ✅ Safe to use here
      } catch (err) {
        console.error("Access Denied:", err.message);
        alert("Login failed: You are not authorized to access this application. Please contact your administrator if you believe this is an error.");
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px 32px",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(60,60,60,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "320px"
      }}>
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          style={{ width: 48, height: 48, marginBottom: 24 }}
        />
        <h2 style={{
          margin: 0,
          marginBottom: 16,
          fontWeight: 600,
          color: "#222",
          fontSize: "1.5rem"
        }}>
          Sign in to Hospital
        </h2>
        <button
          onClick={() => login()}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            color: "#444",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            padding: "10px 24px",
            cursor: "pointer",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.05)",
            fontWeight: 500,
            transition: "box-shadow 0.2s"
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            style={{ width: 20, height: 20, marginRight: 12 }}
          />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
