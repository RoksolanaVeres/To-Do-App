import { createContext, useState, useEffect } from "react";

export const TasksContext = createContext(null);

const TASKS_STORAGE_KEY = "my tasks";

export default function TasksContextProvider({ children }) {
  const storedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  const [tasks, setTasks] = useState(storedTasks || {});

  function saveTasksinLocalStorage() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }

  useEffect(() => {
    saveTasksinLocalStorage();
  }, [tasks]);

  const value = { tasks, setTasks };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
