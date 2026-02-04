import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/currentAffairs.css";

const CurrentAffairs = () => {
  const [affairs, setAffairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffairs = async () => {
      const snap = await getDocs(collection(db, "currentAffairs"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by date (latest first)
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setAffairs(data);
      setLoading(false);
    };

    fetchAffairs();
  }, []);

  return (
    <div className="ca-page">
      <h1 className="ca-title">📰 Current Affairs</h1>

      {loading ? (
        <p className="ca-state">Loading current affairs...</p>
      ) : affairs.length === 0 ? (
        <p className="ca-state">No current affairs available</p>
      ) : (
        <div className="ca-grid">
          {affairs.map((item) => (
            <div className="ca-card" key={item.id}>
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt="Current Affairs"
                  className="ca-thumb"
                />
              )}

              <div className="ca-content">
                <div className="ca-date">
                  {new Date(item.date).toDateString()}
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="ca-actions">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentAffairs;
