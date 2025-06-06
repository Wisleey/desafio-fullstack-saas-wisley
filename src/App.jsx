"use client";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import CreateTeam from "./pages/CreateTeam";
import AddTeamMember from "./pages/AddTeamMember";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import Profile from "./pages/Profile";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" replace />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamDetail />} />
        <Route path="teams/create" element={<CreateTeam />} />
        <Route path="teams/:id/add-member" element={<AddTeamMember />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/create" element={<CreateTask />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Catch all route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
