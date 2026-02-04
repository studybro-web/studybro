import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/quiz.css";

const DailyQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  // 📅 Selected date (default = today)
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setSelected({});

      try {
        const q = query(
          collection(db, "dailyQuiz"),
          where("quizDate", "==", selectedDate)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [selectedDate]);

  const handleSelect = (qid, option) => {
    if (selected[qid]) return;
    setSelected({ ...selected, [qid]: option });
  };

  return (
    <div className="quiz-page">
      {/* HERO */}
      <section className="quiz-hero">
        <h1>🧠 Daily Quiz</h1>
        <p>
          Test your knowledge every day. Improve accuracy, speed, and confidence
          with carefully curated questions.
        </p>

        {/* 📅 DATE SELECTOR (NEW) */}
        <div className="quiz-date-filter">
          <label>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </section>

      {loading ? (
        <p className="quiz-state">Loading quiz...</p>
      ) : questions.length === 0 ? (
        <p className="quiz-state">No quiz available for this date</p>
      ) : (
        <div className="quiz-list">
          {questions.map((q, index) => {
            const selectedOption = selected[q.id];

            return (
              <div className="quiz-container" key={q.id}>
                {/* Question Header */}
                <div className="quiz-header">
                  <span className="quiz-number">Q{index + 1}</span>
                  <h3 className="quiz-question">{q.question}</h3>
                </div>

                {/* Options */}
                <div className="options">
                  {Array.isArray(q.options) &&
                    q.options.map((opt, i) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = opt === q.correctAnswer;

                      let cls = "option";
                      if (isSelected && isCorrect) cls += " correct";
                      if (isSelected && !isCorrect) cls += " wrong";
                      if (selectedOption && isCorrect) cls += " correct";

                      return (
                        <button
                          key={i}
                          className={cls}
                          onClick={() => handleSelect(q.id, opt)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                </div>

                {/* Explanation */}
                {selectedOption && (
                  <div className="explanation-box">
                    <h4>Explanation</h4>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;
