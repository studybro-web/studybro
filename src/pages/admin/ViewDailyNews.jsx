import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminList.css";

const AdminDailyNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "dailyNews"));
    setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "dailyNews", id));
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="admin-list">
      <h2>🗞 Daily News</h2>
      {news.length == 0 && <p style={{color:"white"}}>No materials added</p>}
      {news.map(n => (
        <div className="list-card" key={n.id}>
          <span>{n.title}</span>
          <button onClick={() => handleDelete(n.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDailyNews;
