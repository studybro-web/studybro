import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

/* AUTH */
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Home from "./pages/auth/Home";

/* STUDENT */
import DailyNews from "./pages/student/DailyNews";
import DailyQuiz from "./pages/student/DailyQuiz";
import GK from "./pages/student/GK";
import CurrentAffairs from "./pages/student/CurrentAffairs";
import ClassNotes from "./pages/student/ClassNotes";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddDailyNews from "./pages/admin/AddDailyNews";
import ViewDailyNews from "./pages/admin/ViewDailyNews";
import AddDailyQuiz from "./pages/admin/AddDailyQuiz";
import AddGK from "./pages/admin/AddGK";
import AddCurrentAffairs from "./pages/admin/AddCurrentAffairs";
import ViewCurrentAffairs from "./pages/admin/ViewCurrentAffairs";
import AddClassNotes from "./pages/admin/AddClassNotes";
import AdminViewMaterials from "./pages/admin/AdminViewMaterials";
import AdminGKSubjects from "./pages/admin/AdminGKSubjects";
import AdminGKList from "./pages/admin/AdminGKList";
import AdminClassSelect from "./pages/admin/AdminClassSelect";
import AdminClassSubjects from "./pages/admin/AdminClassSubjects";
import AdminClassChapters from "./pages/admin/AdminClassChapters";
import AdminDailyQuiz from "./pages/admin/AdminDailyQuiz";
import NotFound from "./components/NotFound";

/* ---------- LAYOUT ---------- */
const Layout = ({ children }) => {
  const location = useLocation();

  // pages where header/footer should NOT appear
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/home" element={<Home />} />

          {/* STUDENT */}
          <Route path="/news" element={<DailyNews />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/gk" element={<GK />} />
          <Route path="/current-affairs" element={<CurrentAffairs />} />
          <Route path="/class-notes" element={<ClassNotes />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-current-affairs"
            element={
              <AdminRoute>
                <AddCurrentAffairs />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/current-affairs"
            element={
              <AdminRoute>
                <ViewCurrentAffairs />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-daily-news"
            element={
              <AdminRoute>
                <AddDailyNews />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/daily-news"
            element={
              <AdminRoute>
                <ViewDailyNews />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-daily-quiz"
            element={
              <AdminRoute>
                <AddDailyQuiz />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-gk"
            element={
              <AdminRoute>
                <AddGK />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view-materials"
            element={
              <AdminRoute>
                <AdminViewMaterials />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/gk"
            element={
              <AdminRoute>
                <AdminGKSubjects />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/view/daily-quiz"
            element={
              <AdminRoute>
                <AdminDailyQuiz />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/gk/:subject"
            element={
              <AdminRoute>
                <AdminGKList />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-class-notes"
            element={
              <AdminRoute>
                <AddClassNotes />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/class-notes"
            element={
              <AdminRoute>
                <AdminClassSelect />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/class/:classNo"
            element={
              <AdminRoute>
                <AdminClassSubjects />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/view/class/:classNo/:subject"
            element={
              <AdminRoute>
                <AdminClassChapters />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
