// import { useState } from "react";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../../firebase";
// import "../../styles/addCurrentAffairs.css";

// const AddCurrentAffairs = () => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     driveLink: "",
//     youtubeLink: "",
//     date: "",
//   });

//   const [thumbnailFile, setThumbnailFile] = useState(null); // ✅ NEW
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let thumbnailURL = "";

//       // ✅ 1. Upload image to Firebase Storage
//       if (thumbnailFile) {
//         const imageRef = ref(
//           storage,
//           `currentAffairs/${Date.now()}_${thumbnailFile.name}`
//         );

//         await uploadBytes(imageRef, thumbnailFile);
//         thumbnailURL = await getDownloadURL(imageRef);
//       }

//       // ✅ 2. Save data to Firestore
//       await addDoc(collection(db, "currentAffairs"), {
//         ...form,
//         thumbnail: thumbnailURL, // ✅ REAL IMAGE URL
//         date: form.date || null,
//         createdAt: Timestamp.now(),
//       });

//       setSuccess("✅ Current Affair added successfully");

//       setForm({
//         title: "",
//         description: "",
//         driveLink: "",
//         youtubeLink: "",
//         date: "",
//       });
//       setThumbnailFile(null);

//       setTimeout(() => setSuccess(""), 3000);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to add Current Affairs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ca-wrapper">
//       <form className="ca-card" onSubmit={handleSubmit}>
//         <h2>Add Current Affairs</h2>

//         {success && <p className="success">{success}</p>}

//         <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//         />

//         <textarea
//           name="description"
//           placeholder="Short exam-focused description"
//           rows="4"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="driveLink"
//           placeholder="Drive PDF Link"
//           value={form.driveLink}
//           onChange={handleChange}
//         />

//         <input
//           name="youtubeLink"
//           placeholder="YouTube Video Link"
//           value={form.youtubeLink}
//           onChange={handleChange}
//         />

//         {/* ✅ IMAGE FILE INPUT */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setThumbnailFile(e.target.files[0])}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Add Current Affairs"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCurrentAffairs;
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/addCurrentAffairs.css";

const AddCurrentAffairs = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    driveLink: "",
    youtubeLink: "",
    date: "",
    thumbnail: "", // ✅ image URL
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "currentAffairs"), {
        title: form.title,
        description: form.description,
        driveLink: form.driveLink,
        youtubeLink: form.youtubeLink,
        date: form.date || null,
        thumbnail: form.thumbnail, // ✅ URL saved directly
        createdAt: Timestamp.now(),
      });

      setSuccess("✅ Current Affair added successfully");

      setForm({
        title: "",
        description: "",
        driveLink: "",
        youtubeLink: "",
        date: "",
        thumbnail: "",
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add Current Affairs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-wrapper">
      <form className="ca-card" onSubmit={handleSubmit}>
        <h2>Add Current Affairs</h2>

        {success && <p className="success">{success}</p>}

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Short exam-focused description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="driveLink"
          placeholder="Drive PDF Link"
          value={form.driveLink}
          onChange={handleChange}
        />

        <input
          name="youtubeLink"
          placeholder="YouTube Video Link"
          value={form.youtubeLink}
          onChange={handleChange}
        />

        {/* ✅ IMAGE URL INPUT */}
        <input
          type="url"
          name="thumbnail"
          placeholder="Image URL (Cloudinary / CDN)"
          value={form.thumbnail}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Current Affairs"}
        </button>
      </form>
    </div>
  );
};

export default AddCurrentAffairs;
