import { useRef, useContext, useState } from "react";
import Task from "./components/Task";
import { ThemeContext } from "./contexts/ThemeContext";
import { TasksContext } from "./contexts/TasksContext";
import MotivationQuotes from "./components/MotivationQuotes";
import ThemeButtons from "./components/ThemeButtons";

export default function App() {
  const { theme } = useContext(ThemeContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const [taskCategory, setTaskCategory] = useState("all");
  const inputRef = useRef(null);

  //setting theme attribute to body
  document.getElementById("body").setAttribute("data-theme", theme);

  // calculate number of all, completed, active tasks
  const allTasksNum = Object.keys(tasks).length;
  const completedTasksNum = Object.values(tasks).filter(
    (task) => task.completed === true
  ).length;
  const activeTasksNum = allTasksNum - completedTasksNum;

  // display different tasks depending on category:
  const tasksCopy = structuredClone(tasks);
  let tasksToDisplay = tasksCopy;

  if (taskCategory === "completed") {
    Object.keys(tasksCopy).forEach((key) => {
      if (!tasksCopy[key].completed) {
        delete tasksCopy[key];
      }
    });
    tasksToDisplay = tasksCopy;
  } else if (taskCategory === "active") {
    Object.keys(tasksCopy).forEach((key) => {
      if (tasksCopy[key].completed) {
        delete tasksCopy[key];
      }
    });
    tasksToDisplay = tasksCopy;
  } else {
    tasksToDisplay = tasksCopy;
  }

  //Functions
  function handleSubmit(e) {
    e.preventDefault();

    if (inputRef.current.value === "") {
      return;
    }

    let taskID = crypto.randomUUID();
    let inputValue = inputRef.current.value;

    setTasks((currentTasks) => {
      return {
        ...currentTasks,
        [taskID]: { task: inputValue, completed: false },
      };
    });

    inputRef.current.value = "";
  }

  function handleRemoveCompleted() {
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

  function handleDeleteAll() {
    if (Object.keys(tasks).length === 0) {
      return;
    }
    setTasks({});
  }

  return (
    <div className="app-container">
      <header className="header-container">
        <ThemeButtons />

        {theme === "motivation" && <MotivationQuotes />}

        <form action="" onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            ref={inputRef}
            className="form-input"
            placeholder="Create a new todo..."
          />
        </form>
      </header>

      <main className="main-container">
        {tasks && (
          <div className="tasks-container">
            <ul className="tasks-list">
              {Object.entries(tasksToDisplay).map(
                ([taskId, { task, completed }]) => (
                  <Task
                    key={taskId}
                    taskId={taskId}
                    task={task}
                    completed={completed}
                  />
                )
              )}
            </ul>
          </div>
        )}
        <div className="results-container">
          <div className="show-results__container">
            <button onClick={() => setTaskCategory("all")}>
              All ({allTasksNum})
            </button>
            <button onClick={() => setTaskCategory("active")}>
              Active ({activeTasksNum})
            </button>
            <button onClick={() => setTaskCategory("completed")}>
              Completed ({completedTasksNum})
            </button>
          </div>
          <div className="remove-results__container">
            <button
              onClick={handleRemoveCompleted}
              disabled={!completedTasksNum}
            >
              Remove completed
            </button>
            <button type="button" onClick={handleDeleteAll}>
              Remove ALL
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
