import { createContext, useState, useEffect } from "react";

const TASKS_STORAGE_KEY = "my tasks";

export const TasksContext = createContext(null);

export default function TasksContextProvider({ children }) {
  const storedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  const [tasks, setTasks] = useState(storedTasks || []);

  // saving tasks in localStorage
  function saveTasksinLocalStorage() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }

  useEffect(() => {
    saveTasksinLocalStorage();
  }, [tasks]);

  // functions
  function addNewTaskFromInput(inputRef) {
    let taskID = crypto.randomUUID();
    let inputValue = inputRef.current.value;

    setTasks((currentTasks) => {
      return [...currentTasks, { taskId: taskID, taskText: inputValue, completed: false }];
    });
  }

  function deleteSelectedTask(taskID) {
    setTasks((currentTasks) => {
      const tasksCopy = structuredClone(currentTasks);
      const filteredTasks = tasksCopy.filter((task) => task.taskId !== taskID);
      return filteredTasks;
    });
  }

  function deleteCompletedTasks() {
    setTasks((currentTasks) => {
      const tasksCopy = structuredClone(currentTasks);
      const filteredTasks = tasksCopy.filter((task) => task.completed === false);
      return filteredTasks;
    });
  }

  function deleteAllTasks() {
    if (tasks.length === 0) {
      return;
    }
    setTasks([]);
  }

  function saveEditedTask(taskId, editedTask) {
    setTasks((currentTasks) => {
      const newTasks = structuredClone(currentTasks);
      const updatedTask = newTasks.find((task) => task.taskId === taskId);
      updatedTask.taskText = editedTask;
      updatedTask.completed = false;
      return newTasks;
    });
  }

  function toggleTaskStatus(taskId) {
    setTasks((currentTasks) => {
      const newTasks = structuredClone(currentTasks);
      const checkedTask = newTasks.find((task) => task.taskId === taskId);
      checkedTask.completed = !checkedTask.completed;

      return newTasks;
    });
  }

  const value = {
    tasks,
    setTasks,
    addNewTaskFromInput,
    deleteAllTasks,
    deleteCompletedTasks,
    deleteSelectedTask,
    saveEditedTask,
    toggleTaskStatus,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}
