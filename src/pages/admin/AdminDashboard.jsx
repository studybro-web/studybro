import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Manage all study materials from one place</p>

      <div className="admin-grid">
        <div onClick={() => navigate("/admin/add-current-affairs")} className="admin-card">
          📢 Add Current Affairs
        </div>

        <div onClick={() => navigate("/admin/add-daily-news")} className="admin-card">
          📰 Add Daily News
        </div>

        <div onClick={() => navigate("/admin/add-gk")} className="admin-card">
          📚 Add GK
        </div>

        <div onClick={() => navigate("/admin/add-class-notes")} className="admin-card">
          🏫 Add Class Notes
        </div>

        <div onClick={() => navigate("/admin/add-daily-quiz")} className="admin-card">
          ❓ Add Daily Quiz
        </div>

        <div onClick={() => navigate("/admin/view-materials")} className="admin-card danger">
          🗑 View / Delete Materials
        </div>
      </div>
    </div>
  );
}
