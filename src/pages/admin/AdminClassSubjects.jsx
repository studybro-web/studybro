// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";
// import "../../styles/adminSelector.css";

// const AdminClassSubjects = () => {
//   const { classNo } = useParams();
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const snap = await getDocs(collection(db, "classNotes"));
//       const subs = [
//         ...new Set(
//           snap.docs
//             .map(d => d.data())
//             .filter(n => n.classNo == classNo)
//             .map(n => n.subject)
//         ),
//       ];
//       setSubjects(subs);
//     };
//     fetch();
//   }, [classNo]);

//   return (
//     <div className="selector-page">
//       <h2>Class {classNo} Subjects</h2>

//       <div className="selector-grid">
//         {subjects.map(s => (
//           <button
//             key={s}
//             onClick={() =>
//               navigate(`/admin/view/class/${classNo}/${s}`)
//             }
//           >
//             {s}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminClassSubjects;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/adminSelector.css";

const AdminClassSubjects = () => {
  const { classNo } = useParams(); // STRING
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "classNotes"));

      const subs = [
        ...new Set(
          snap.docs
            .map(d => d.data())
            // ✅ FIX: type-safe comparison
            .filter(n => String(n.classNo) === String(classNo))
            .map(n => n.subject)
        ),
      ];

      setSubjects(subs);
    };

    fetch();
  }, [classNo]);

  return (
    <div className="selector-page">
      <h2>Class {classNo} Subjects</h2>

      {subjects.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          No subjects added yet
        </p>
      ) : (
        <div className="selector-grid">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() =>
                navigate(`/admin/view/class/${classNo}/${s}`)
              }
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminClassSubjects;
