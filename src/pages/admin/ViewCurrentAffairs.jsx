import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminList.css";

const AdminCurrentAffairs = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "currentAffairs"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "currentAffairs", id));
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="admin-list">
      <h2>📰 Current Affairs</h2>
      {items.length == 0 && <p style={{color:"white"}}>No materials added</p>}
      {items.map(item => (
        <div className="list-card" key={item.id}>
          <span>{item.title}</span>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminCurrentAffairs;
