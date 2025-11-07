import { useState } from "react"
import { useTasks } from "../Context/TasksContext.jsx";

/**
 * TaskForm: componente del formulario.
 * useTasks() -> addTask: puente al estado global para agregar la tarea.
 * useState (title, setTitle): estado local del texto que el usuario escribe para poder mostrarlo, enviarlo y resetearlo.
 */
export default function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
  event.preventDefault(); // evita que el form recargue la página
  addTask(title);         // crea la tarea con el texto del input
  setTitle("");           // limpia el campo de texto
  }

  return (
    /* FORMULARIO: onSubmit se dispara al hacer click en el botón type="submit" o al presionar Enter */
    <form onSubmit={handleSubmit} className="task-form">
      <input
        // tipo de campo texto para escribir la descripción de la tarea
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        // cada tecla actualiza el estado local `title`
        placeholder="Write a new task..." />
      
      {/* BOTÓN de envío: al ser type="submit" dispara el onSubmit del <form> */}
      <button type="submit">Add</button>
    </form>
  )
} 