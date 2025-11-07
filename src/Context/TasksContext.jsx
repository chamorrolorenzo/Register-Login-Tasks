import { useState, useContext, createContext, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {collection, addDoc, getDocs, deleteDoc, doc, query, orderBy,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// 🔹 Creamos el contexto
const TasksContext = createContext();

// 🔹 Hook personalizado para consumir el contexto
export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
}

// 🔹 Provider principal
export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // 🔹 Cargar tareas cuando el usuario se loguea
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setTasks([]);
        return;
      }

      try {
        const tasksRef = collection(db, "tasks", user.uid, "userTasks");
        const q = query(tasksRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const userTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(userTasks);
      } catch (error) {
        console.error("❌ Error al cargar tareas:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Agregar tarea
  const addTask = async (title) => {
    try {
      if (!title.trim()) return;

      let user = auth.currentUser;
      if (!user) {
        await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
              user = u;
              resolve();
              unsubscribe();
            }
          });
        });
      }

      if (!user) {
        alert("No estás logueado.");
        return;
      }

      const newTask = {
        title,
        done: false,
        createdAt: new Date(),
      };

      const docRef = await addDoc(
        collection(db, "tasks", user.uid, "userTasks"),
        newTask
      );

      setTasks((prev) => [{ id: docRef.id, ...newTask }, ...prev]);
    } catch (error) {
      console.error("❌ Error al agregar tarea:", error);
    }
  };

  // 🔹 Alternar tarea completada (sincronizado con Firestore)
  const toggleTask = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const taskRef = doc(db, "tasks", user.uid, "userTasks", id);
      await updateDoc(taskRef, { done: !task.done });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t
        )
      );
    } catch (error) {
      console.error("❌ Error al alternar tarea:", error);
    }
  };

  // 🔹 Eliminar tarea
  const removeTask = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, "tasks", user.uid, "userTasks", id));
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  };

  // 🔹 Valor global
  const value = { tasks, addTask, toggleTask, removeTask };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}
