import { Routes, Route } from "react-router-dom";
import Login from "./views/Login.jsx";
import Tasks from "./views/Tasks.jsx";
import ProtectedRoute from "./Router/ProtectedRoute.jsx";
import Register from "./views/Register.jsx"; // 👈 agregá esta línea

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login redirectTo="/tasks" />} />
      <Route path="/register" element={<Register />} /> {/* 👈 agregá esta ruta */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      {/* default: manda al login */}
      <Route path="*" element={<Login redirectTo="/tasks" />} />
    </Routes>
  );
}
