import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminList.css";

const AdminGKList = () => {
  const { subject } = useParams();
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "gk"));
    setItems(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(i => i.subject === subject)
    );
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "gk", id));
    fetchData();
  };

  useEffect(() => { fetchData(); }, [subject]);

  return (
    <div className="admin-list">
      <h2>{subject}</h2>

      {items.length == 0 && <p>No materials added</p>}

      {items.map(item => (
        <div className="list-card" key={item.id}>
          <span>{item.title}</span>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminGKList;
