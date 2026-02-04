import "../../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Welcome to <span>Study Bro</span>
        </h1>
        <p className="subtitle">
          Your smart learning companion for Classes 6–12, GK, Current Affairs,
          Daily News, and Competitive Exam Preparation.
        </p>

        <div className="hero-buttons">
          <Link to="/current-affairs" className="hero-btn">
            📰 Current Affairs
          </Link>
          <Link to="/news" className="hero-btn ">
           🗞️ News
          </Link>
          <Link to="/daily-quiz" className="hero-btn">
            🧠 Daily Quiz
          </Link>
          <Link to="/gk" className="hero-btn">
            🌍 General Knowledge
          </Link>
          <Link to="/class-notes" className="hero-btn ">
            📘 Class Notes 6 -12
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Study Bro?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>📚 Structured Learning</h3>
            <p>
              Class-wise and subject-wise notes designed for clear understanding
              and fast revision.
            </p>
          </div>

          <div className="feature-card">
            <h3>📰 Daily Updates</h3>
            <p>
              Stay updated with daily news and current affairs relevant for
              exams.
            </p>
          </div>

          <div className="feature-card">
            <h3>🧠 Practice & Improve</h3>
            <p>
              Daily quizzes and GK materials to boost memory and confidence.
            </p>
          </div>

          <div className="feature-card">
            <h3>🚀 Student Friendly</h3>
            <p>
              Simple UI, fast loading, mobile-friendly, and distraction-free
              learning.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
