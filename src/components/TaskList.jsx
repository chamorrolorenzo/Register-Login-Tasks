// src/components/TaskList.jsx
// Lista visual de tareas. Consume el contexto y muestra cada ítem.
import { useTasks } from "../Context/TasksContext.jsx";

//conponente par aun solo item de tarea
function TaskItem({ task, onToggle, onRemove }) {
   return (
    <li className="task-item">
      {/* Checkbox refleja si la tarea está hecha (done) */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      {/* Título de la tarea. Si está done, la mostramos tachada (estilo por CSS) */}
      <span>{task.title}</span>

      {/* Botón para borrar la tarea */}
      <button onClick={() => onRemove(task.id)}>Delete</button>
    </li>
  );
}

export default function TaskList() {
  const { tasks, toggleTask, removeTask } = useTasks();

  if (tasks.length === 0) {
    return <p>No hay tareas todavía.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
      ))}
    </ul>
  );
}

