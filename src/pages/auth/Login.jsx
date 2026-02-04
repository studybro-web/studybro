import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";



const Login = () => {

  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/home");
    } catch (err) {
      setError(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>📘 Study Bro</h1>
        <p>
          Your smart study companion for <strong>Class 6–12</strong> and
          <strong> competitive exams</strong>.
        </p>

        <ul>
          <li>✔ Daily Current Affairs</li>
          <li>✔ GK & Notes</li>
          <li>✔ Daily Quiz Practice</li>
          <li>✔ Exam-focused content</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

          <p className="subtitle">
            {isRegister
              ? "Register to start learning with Study Bro"
              : "Login to continue your preparation"}
          </p>

          {error && <p className="error">{error}</p>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button  disabled={loading}> 
            {loading
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>

          <p className="toggle-text">
            {isRegister ? "Already have an account?" : "New to Study Bro?"}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? " Login" : " Register"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
