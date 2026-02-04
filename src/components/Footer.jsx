import "../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h2>📘 Study Bro</h2>
          <p>
            A modern learning platform for <strong>Class 6–12</strong>,
            competitive exams, GK, daily quizzes, and current affairs.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/home">Home</Link>
          <Link to="/current-affairs">Current Affairs</Link>
          <Link to="/daily-quiz">Daily Quiz</Link>
          <Link to="/gk">General Knowledge</Link>
          <Link to="/class-notes">Class Notes</Link>
        </div>

        {/* ADMIN */}
        <div className="footer-links">
          <h4>Admin</h4>
          <Link to="/admin-login">Admin Login</Link>
          <Link to="/admin">Dashboard</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Connect</h4>
          <p>📧 support studybro596@gmail.com</p>
          <p>🌐 Learn. Practice. Succeed.</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Study Bro • All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
