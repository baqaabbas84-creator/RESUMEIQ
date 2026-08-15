import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import UploadResume from "../pages/UploadResume";
import Analysis from "../pages/Analysis";
import Interview from "../pages/Interview";
import InterviewResult from "../components/interview/InterviewResult";
import History from "../pages/History";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            HOME
        ========================= */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            AUTHENTICATION
        ========================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================
            DASHBOARD
        ========================= */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* =========================
            RESUME
        ========================= */}
        <Route
          path="/upload-resume"
          element={<UploadResume />}
        />


        {/* =========================
            ANALYSIS
        ========================= */}
        <Route
          path="/analysis"
          element={<Analysis />}
        />


        {/* =========================
            INTERVIEW
        ========================= */}
        <Route
          path="/interview"
          element={<Interview />}
        />

        {/* Interview Result */}
        <Route
          path="/interview/result"
          element={<InterviewResult />}
        />


        {/* =========================
            HISTORY
        ========================= */}
        <Route
          path="/history"
          element={<History />}
        />


        {/* =========================
            PROFILE
        ========================= */}
        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* =========================
            404
        ========================= */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;