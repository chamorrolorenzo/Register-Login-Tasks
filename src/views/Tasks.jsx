import { useLogin } from "../Context/LoginContext";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import "../style/App.css"

export default function Tasks() {
  const { logout } = useLogin();
  return (
    <main>
      <header>
        <h1>Tasks</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      <TaskForm />   {/* agrega tareas */}
      <TaskList />   {/* lista, tildar y borrar */}
    </main>
  );
}
