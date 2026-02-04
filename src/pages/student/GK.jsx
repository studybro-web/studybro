import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/gk.css";

const subjects = [
  "All",
  "Indian Constitution",
  "History",
  "Economics",
  "Geography",
  "General Science",
  "Science and Technology",
];

const GK = () => {
  const [gkData, setGkData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGK = async () => {
      const snapshot = await getDocs(collection(db, "gk"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGkData(data);
      setLoading(false);
    };

    fetchGK();
  }, []);

  const filteredGK =
    selectedSubject === "All"
      ? gkData
      : gkData.filter((item) => item.subject === selectedSubject);

  return (
    <div className="gk-page">
      <h1 className="gk-title">📘 General Knowledge</h1>

      {/* Subject Filter */}
      <div className="gk-filters">
        {subjects.map((sub) => (
          <button
            key={sub}
            className={selectedSubject === sub ? "active" : ""}
            onClick={() => setSelectedSubject(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading">Loading GK...</p>
      ) : filteredGK.length === 0 ? (
        <p className="empty">No GK available</p>
      ) : (
        <div className="gk-grid">
          {filteredGK.map((item) => (
            <div className="gk-card" key={item.id}>
              <div className="gk-subject">{item.subject}</div>
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt="GK Thumbnail"
                  className="gk-thumb"
                />
              )}
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              

              <div className="gk-actions">
                {item.driveLink && (
                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📂 Notes
                  </a>
                )}

                {item.youtubeLink && (
                  <a
                    href={item.youtubeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ▶ Watch
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GK;
