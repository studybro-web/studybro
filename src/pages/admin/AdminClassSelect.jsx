import { useNavigate } from "react-router-dom";
import "../../styles/adminSelector.css";

const classes = [6,7,8,9,10,11,12];

const AdminClassSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="selector-page">
      <h2>Select Class</h2>

      <div className="selector-grid">
        {classes.map(c => (
          <button key={c} onClick={() => navigate(`/admin/view/class/${c}`)}>
            Class {c}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminClassSelect;
