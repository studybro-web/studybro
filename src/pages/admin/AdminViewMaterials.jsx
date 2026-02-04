import { useNavigate } from "react-router-dom";
import "../../styles/adminViewMaterials.css";

const AdminViewMaterials = () => {
  const navigate = useNavigate();

  return (
    <div className="avm-wrapper">
      <h1>📂 View Uploaded Materials</h1>

      <div className="avm-grid">
        <div onClick={() => navigate("/admin/view/current-affairs")}>
          📰 Current Affairs
        </div>

        <div onClick={() => navigate("/admin/view/gk")}>
          📘 GK
        </div>

        <div onClick={() => navigate("/admin/view/daily-news")}>
          🗞 Daily News
        </div>

        <div onClick={() => navigate("/admin/view/class-notes")}>
          🎓 Class Notes (6–12)
        </div>

        <div onClick={() => navigate("/admin/view/daily-quiz")}>
          🧠 Daily Quiz
        </div>
      </div>
    </div>
  );
};

export default AdminViewMaterials;
