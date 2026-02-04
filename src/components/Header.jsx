import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">📘 Study Bro</div>

      <nav
        ref={navRef}
        className={open ? "nav open" : "nav"}
        onClick={() => setOpen(false)}
      >
        <Link to="/home">Home</Link>
        <Link to="/current-affairs">Current Affairs</Link>
        <Link to="/news">News</Link>
        <Link to="/daily-quiz">Daily Quiz</Link>
        <Link to="/gk">GK</Link>
        <Link to="/class-notes">Class</Link>
        <Link to="/admin-login" className="admin-btn">
          Admin
        </Link>
      </nav>

      <div
        className="hamburger"
        ref={hamburgerRef}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
    </header>
  );
};

export default Header;
