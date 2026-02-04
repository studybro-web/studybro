import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/addGK.css";

const subjects = [
  "Indian Constitution",
  "History",
  "Economics",
  "Geography",
  "General Science",
  "Science and Technology",
];

const AddGK = () => {
  const [subject, setSubject] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    driveLink: "",
    youtubeLink: "",
    thumbnail: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "gk"), {
        subject,
        ...form,
        createdAt: Timestamp.now(),
      });

      setSuccess("GK material added successfully ✅");
      setForm({
        title: "",
        description: "",
        driveLink: "",
        youtubeLink: "",
        thumbnail: "",
      });
      setSubject("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gk-wrapper">
      <div className="gk-card">
        <h2>Add GK Material</h2>

        {success && <p className="success">{success}</p>}

        {/* STEP 1: SUBJECT SELECTION */}
        {!subject && (
          <div className="subject-grid">
            {subjects.map((sub) => (
              <button
                key={sub}
                className="subject-btn"
                onClick={() => setSubject(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: FORM */}
        {subject && (
          <form onSubmit={handleSubmit} className="gk-form">
            <div className="subject-badge">{subject}</div>

            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Small description (exam focused)"
              rows="4"
              value={form.description}
              onChange={handleChange}
              required
            />

            <input
              name="driveLink"
              placeholder="Drive material link"
              value={form.driveLink}
              onChange={handleChange}
            />

            <input
              name="youtubeLink"
              placeholder="YouTube video link"
              value={form.youtubeLink}
              onChange={handleChange}
            />

            <input
              name="thumbnail"
              placeholder="Thumbnail image URL"
              value={form.thumbnail}
              onChange={handleChange}
            />

            <button disabled={loading}>
              {loading ? "Uploading..." : "Add GK Material"}
            </button>

            <p className="change-subject" onClick={() => setSubject("")}>
              ← Change Subject
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddGK;
