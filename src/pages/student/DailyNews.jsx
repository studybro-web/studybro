import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/dailyNews.css";

const DailyNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const snap = await getDocs(collection(db, "dailyNews"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by date (latest first)
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setNews(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <h1 className="news-title">🗞️ Daily News</h1>

      {loading ? (
        <p className="news-state">Loading news...</p>
      ) : news.length === 0 ? (
        <p className="news-state">No news available</p>
      ) : (
        <div className="news-grid">
          {news.map((item) => (
            <div className="news-card" key={item.id}>
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt="News Thumbnail"
                  className="news-thumb"
                />
              )}

              <div className="news-content">
                <span className="news-date">
                  {new Date(item.date).toDateString()}
                </span>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="news-actions">
                  {item.driveLink && (
                    <a
                      href={item.driveLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📂 Read
                    </a>
                  )}

                  {item.youtubeLink && (
                    <a
                      href={item.youtubeLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ▶ Watch
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyNews;
