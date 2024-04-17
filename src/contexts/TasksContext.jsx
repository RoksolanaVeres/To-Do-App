import { createContext, useState, useEffect } from "react";

const TASKS_STORAGE_KEY = "my tasks";

export const TasksContext = createContext(null);

export default function TasksContextProvider({ children }) {
  const storedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  const [tasks, setTasks] = useState(storedTasks || {});

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
      return {
        ...currentTasks,
        [taskID]: { task: inputValue, completed: false },
      };
    });
  }

  function deleteSelectedTask(taskID) {
    setTasks((currentTasks) => {
      const updatedTasks = structuredClone(currentTasks);
      delete updatedTasks[taskID];
      return updatedTasks;
    });
  }

  function deleteCompletedTasks() {
    setTasks((currentTasks) => {
      const newTasks = { ...currentTasks };
      Object.keys(newTasks).forEach((key) => {
        if (newTasks[key].completed) {
          delete newTasks[key];
        }
      });
      return newTasks;
    });
  }

  function deleteAllTasks() {
    if (Object.keys(tasks).length === 0) {
      return;
    }
    setTasks({});
  }

  function saveEditedTask(taskId, editedTask) {
    setTasks((currentTasks) => {
      const newTasks = structuredClone(currentTasks);
      newTasks[taskId].task = editedTask;
      newTasks[taskId].completed = false;
      return newTasks;
    });
  }

  function toggleTaskStatus(taskId) {
    setTasks((currentTasks) => {
      const newTasks = structuredClone(currentTasks);
      newTasks[taskId].completed = !newTasks[taskId].completed;

      return newTasks;
    });
  }

  function getTasksOfSelectedCategory(tasksCategory) {
    let selectedCategoryTasks = undefined;
    const tasksCopy = structuredClone(tasks);

    if (tasksCategory === "completed") {
      Object.keys(tasksCopy).forEach((key) => {
        if (!tasksCopy[key].completed) {
          delete tasksCopy[key];
        }
      });
      selectedCategoryTasks = tasksCopy;
    } else if (tasksCategory === "active") {
      Object.keys(tasksCopy).forEach((key) => {
        if (tasksCopy[key].completed) {
          delete tasksCopy[key];
        }
      });
      selectedCategoryTasks = tasksCopy;
    } else {
      selectedCategoryTasks = tasksCopy;
    }
    return selectedCategoryTasks;
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
    getTasksOfSelectedCategory,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}
