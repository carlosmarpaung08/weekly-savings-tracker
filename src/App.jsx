import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar         from "./components/layout/Navbar";
import HomePage       from "./pages/HomePage";
import HistoryPage    from "./pages/HistoryPage";
import WeekDetailPage from "./pages/WeekDetailPage";
import LoginPage      from "./pages/LoginPage";
import AdminPage      from "./pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-main">
          <Navbar />
          <Routes>
            <Route path="/"              element={<HomePage />} />
            <Route path="/history"       element={<HistoryPage />} />
            <Route path="/week/:week_id" element={<WeekDetailPage />} />
            <Route path="/login"         element={<LoginPage />} />
            <Route path="/admin"         element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}