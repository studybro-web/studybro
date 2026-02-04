import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/addDailyQuiz.css";

const AddDailyQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.includes("") || !correct || !explanation) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // 📅 Auto quiz date (YYYY-MM-DD)
      const today = new Date();
      const quizDate = today.toISOString().split("T")[0];

      await addDoc(collection(db, "dailyQuiz"), {
        question,
        options,
        correctAnswer: correct,
        explanation,
        quizDate,                  // 🔥 Date-wise access
        createdAt: Timestamp.now() // 🔥 Sorting
      });

      setSuccess("Question added successfully ✅");

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrect("");
      setExplanation("");

      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-admin-wrapper">
      <form className="quiz-card" onSubmit={handleSubmit}>
        <h2>Add Daily Quiz</h2>

        {success && <p className="success">{success}</p>}

        {/* 📅 Display current quiz date */}
        <div className="quiz-date">
          📅 Quiz Date: <span>{new Date().toDateString()}</span>
        </div>

        <textarea
          placeholder="Enter the question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="3"
        />

        <div className="options">
          {options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${String.fromCharCode(65 + i)}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
          ))}
        </div>

        <select
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
        >
          <option value="">Select Correct Answer</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              Option {String.fromCharCode(65 + i)}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Explanation of correct answer"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows="4"
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Add Question"}
        </button>
      </form>
    </div>
  );
};

export default AddDailyQuiz;
