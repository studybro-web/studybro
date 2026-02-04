import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminList.css";

const AdminCurrentAffairs = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "dailyQuiz"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "dailyQuiz", id));
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="admin-list">
      <h2>📰 Daily Quiz</h2>
      {items.length == 0 && <p style={{color:"white"}}>No materials added</p>}
      {items.map(item => (
        <div className="list-card" key={item.id}>
          <span>{item.question}</span>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminCurrentAffairs;
