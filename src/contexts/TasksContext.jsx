import { createContext, useReducer, useEffect } from "react";

const TASKS_STORAGE_KEY = "my tasks";

export const TasksContext = createContext(null);

export const ACTIONS = {
  ADD_NEW_TASK: "add-new-task",
  DELETE_SELECTED_TASK: "delete-selected-task",
  DELETE_COMPLETED_TASKS: "delete-completed-tasks",
  DELETE_ALL_TASKS: "delete-all-tasks",
  SAVE_EDITED_TASKS: "save-edited-tasks",
  TOGGLE_TASK_STATUS: "toggle-task-status",
};

function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_NEW_TASK:
      return [
        ...state,
        { taskId: crypto.randomUUID(), taskText: action.payload.inputText, completed: false },
      ];
    case ACTIONS.DELETE_SELECTED_TASK:
      return [...state].filter((task) => task.taskId !== action.payload.taskId);
    case ACTIONS.DELETE_COMPLETED_TASKS:
      return [...state].filter((task) => task.completed === false);
    case ACTIONS.DELETE_ALL_TASKS:
      if (state.length === 0) {
        return;
      } else {
        return (state = []);
      }
    case ACTIONS.SAVE_EDITED_TASKS:
      const newTasks = structuredClone(state);
      const updatedTask = newTasks.find((task) => task.taskId === action.payload.taskId);
      updatedTask.taskText = action.payload.editedTask;
      updatedTask.completed = false;
      return newTasks;
    case ACTIONS.TOGGLE_TASK_STATUS:
      const updatedTasks = structuredClone(state);
      const checkedTask = updatedTasks.find((task) => task.taskId === action.payload.taskId);
      checkedTask.completed = !checkedTask.completed;
      return updatedTasks;
  }
}

export default function TasksContextProvider({ children }) {
  const storedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  const [tasksState, tasksDispatch] = useReducer(tasksReducer, storedTasks || []);

  console.log(tasksState);

  // saving tasks in localStorage
  function saveTasksinLocalStorage() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksState));
  }

  useEffect(() => {
    saveTasksinLocalStorage();
  }, [tasksState]);

  function showTasksInNums() {
    const allTasksNum = tasksState.length;
    const completedTasksNum = [...tasksState].filter((task) => task.completed).length;
    const activeTasksNum = allTasksNum - completedTasksNum;
    return {
      allTasksNum,
      activeTasksNum,
      completedTasksNum,
    };
  }

  const value = { tasksState, tasksDispatch, showTasksInNums };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}
