import { useNavigate } from "react-router-dom";
import "../../styles/adminSelector.css";

const subjects = [
  "Indian Constitution",
  "History",
  "Economics",
  "Geography",
  "General Science",
  "Science and Technology",
];

const AdminGKSubjects = () => {
  const navigate = useNavigate();

  return (
    <div className="selector-page">
      <h2>Select GK Subject</h2>

      <div className="selector-grid">
        {subjects.map(sub => (
          <button
            key={sub}
            onClick={() => navigate(`/admin/view/gk/${sub}`)}
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminGKSubjects;
