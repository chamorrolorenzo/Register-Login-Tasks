import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../style/login.css";

export default function Login({
  redirectTo = "/tasks",
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, login } = useLogin();

  // Si ya hay sesión iniciada, redirigir automáticamente
  useEffect(() => {
    if (isLoggedIn) navigate(redirectTo, { replace: true });
  }, [isLoggedIn, navigate, redirectTo]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar si el correo está confirmado
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      // Si está verificado, continúa con el login normal
      login();
      if (onSuccess) onSuccess();
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      if (error.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found. Please register first.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError("An unexpected error occurred: " + error.code);
      }
    }
  }

  return (
    <main className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="eye-btn"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={!email.trim() || !password.trim()}
        >
          Login
        </button>
      </form>

      <p className="register-text">
        Don’t have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="register-link"
        >
          Register
        </button>
      </p>
    </main>
  );
}
