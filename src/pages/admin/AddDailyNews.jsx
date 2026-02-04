import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/addDailyNews.css";

const AddDailyNews = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
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
    setLoading(true);

    try {
      await addDoc(collection(db, "dailyNews"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      setSuccess("Daily News published successfully 📰");
      setForm({
        title: "",
        date: "",
        description: "",
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
    <div className="news-wrapper">
      <form className="news-card" onSubmit={handleSubmit}>
        <h2>Add Daily News</h2>

        {success && <p className="success">{success}</p>}

        <input name="title" placeholder="News title" value={form.title} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <textarea
          name="description"
          rows="4"
          placeholder="Short description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input name="driveLink" placeholder="Drive Link (PDF)" value={form.driveLink} onChange={handleChange} />
        <input name="youtubeLink" placeholder="YouTube Video Link" value={form.youtubeLink} onChange={handleChange} />
        <input name="thumbnail" placeholder="Thumbnail Image URL" value={form.thumbnail} onChange={handleChange} />

        <button disabled={loading}>
          {loading ? "Publishing..." : "Publish News"}
        </button>
      </form>
    </div>
  );
};

export default AddDailyNews;
