import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/classNotes.css";

const classes = ["6", "7", "8", "9", "10", "11", "12"];

const ClassNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const snap = await getDocs(collection(db, "classNotes"));

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("ALL NOTES:", data); // 🔍 debug
      setNotes(data);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  // Get subjects for selected class
  useEffect(() => {
    if (!selectedClass) return;

    const subs = [
      ...new Set(
        notes
          .filter((n) => n.classNo === selectedClass)
          .map((n) => n.subject)
      ),
    ];

    setSubjects(["All", ...subs]);
    setSelectedSubject("All");
  }, [selectedClass, notes]);

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    if (!selectedClass) return false;
    if (selectedSubject === "All") {
      return n.classNo === selectedClass;
    }
    return (
      n.classNo === selectedClass && n.subject === selectedSubject
    );
  });

  return (
    <div className="class-page">
      <h1 className="class-title">📚 Class 6–12 Notes</h1>

      {/* Class Selector */}
      <div className="class-selector">
        {classes.map((cls) => (
          <button
            key={cls}
            className={selectedClass === cls ? "active" : ""}
            onClick={() => setSelectedClass(cls)}
          >
            Class {cls}
          </button>
        ))}
      </div>

      {/* Subject Selector */}
      {selectedClass && (
        <div className="subject-selector">
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
      )}

      {/* Content */}
      {loading ? (
        <p className="state-text">Loading notes...</p>
      ) : !selectedClass ? (
        <p className="state-text">Select a class to view notes</p>
      ) : filteredNotes.length === 0 ? (
        <p className="state-text">No notes available</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div className="note-card" key={note.id}>
              <div className="note-meta">
                Class {note.classNo} • {note.subject}
              </div>

              <h3>{note.chapter}</h3>

              

              {note.thumbnail && (
                <img
                  src={note.thumbnail}
                  alt="Chapter thumbnail"
                  className="note-thumb"
                />
              )}
              <div className="note-actions">
                <a
                  href={note.driveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  📂 Notes
                </a>

                {note.youtubeLink && (
                  <a
                    href={note.youtubeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ▶ Video
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

export default ClassNotes;
