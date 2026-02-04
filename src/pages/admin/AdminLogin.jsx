import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/adminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (adminKey !== "uttam") {
      alert("❌ Invalid Admin Key");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      loginAdmin();
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleAdminLogin}>
        <h2>Admin Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Admin Key"
          onChange={(e) => setAdminKey(e.target.value)}
        />

        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
