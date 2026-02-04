import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminList.css";

const AdminClassChapters = () => {
  const { classNo, subject } = useParams();
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "classNotes"));
    setNotes(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(n => n.classNo === classNo && n.subject === subject)
    );
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "classNotes", id));
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="admin-list">
      <h2>Class {classNo} – {subject}</h2>

      {notes.map(n => (
        <div className="list-card" key={n.id}>
          <span>{n.chapter}</span>
          <button onClick={() => handleDelete(n.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminClassChapters;
