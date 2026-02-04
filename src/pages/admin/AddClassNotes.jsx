import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/addClassNotes.css";

const classes = ["6", "7", "8", "9", "10", "11", "12"];

const AddClassNotes = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [form, setForm] = useState({
    subject: "",
    chapter: "",
    driveLink: "",
    youtubeLink: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass) {
      alert("Please select a class");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "classNotes"), {
        classNo: selectedClass,   // ✅ FIXED
        subject: form.subject.trim(),
        chapter: form.chapter.trim(),
        driveLink: form.driveLink.trim(),
        youtubeLink: form.youtubeLink.trim(),
        thumbnail: form.thumbnail.trim(),
        createdAt: Timestamp.now(),
      });

      setSuccess("Class notes added successfully ✅");

      setForm({
        subject: "",
        chapter: "",
        driveLink: "",
        youtubeLink: "",
        thumbnail: "",
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="class-wrapper">
      <div className="class-card">
        <h2>Add Class Notes</h2>

        {success && <p className="success">{success}</p>}

        {/* STEP 1: CLASS SELECTION */}
        {!selectedClass && (
          <div className="class-grid">
            {classes.map((cls) => (
              <button
                key={cls}
                className="class-btn"
                onClick={() => setSelectedClass(cls)}
              >
                Class {cls}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: FORM */}
        {selectedClass && (
          <form onSubmit={handleSubmit} className="class-form">
            <div className="class-badge">Class {selectedClass}</div>

            <input
              name="subject"
              placeholder="Subject (Eg: Physics)"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <input
              name="chapter"
              placeholder="Chapter Name"
              value={form.chapter}
              onChange={handleChange}
              required
            />

            <input
              name="driveLink"
              placeholder="Drive Notes Link"
              value={form.driveLink}
              onChange={handleChange}
              required
            />

            <input
              name="youtubeLink"
              placeholder="YouTube Link (optional)"
              value={form.youtubeLink}
              onChange={handleChange}
            />

            <input
              name="thumbnail"
              placeholder="Thumbnail Image URL"
              value={form.thumbnail}
              onChange={handleChange}
            />

            <button disabled={loading}>
              {loading ? "Uploading..." : "Add Notes"}
            </button>

            <p
              className="change-class"
              onClick={() => setSelectedClass(null)}
            >
              ← Change Class
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddClassNotes;

