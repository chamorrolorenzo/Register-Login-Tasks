import { Navigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
