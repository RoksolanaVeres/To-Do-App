import { useRef, useContext } from "react";
import Task from "./components/Task";
import { ThemeContext } from "./contexts/ThemeContext";
import { TasksContext } from "./contexts/TasksContext";
import MotivationQuotes from "./components/MotivationQuotes";
import ThemeButtons from "./components/ThemeButtons";

export default function App() {
  const { theme } = useContext(ThemeContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const inputRef = useRef(null);

  const allTasks = Object.keys(tasks).length;
  const completedTasks = Object.values(tasks).filter(
    (task) => task.completed === true
  ).length;
  const remainingTasks = allTasks - completedTasks;

  //setting theme attribute to body
  document.getElementById("body").setAttribute("data-theme", theme);

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
              {Object.entries(tasks).map(([taskId, { task, completed }]) => (
                <Task
                  key={taskId}
                  taskId={taskId}
                  task={task}
                  completed={completed}
                />
              ))}
            </ul>
          </div>
        )}
        <div className="results-container">
          <p>
            All tasks:{allTasks} Completed:{completedTasks} Remaining:
            {remainingTasks}
          </p>
          <button onClick={handleRemoveCompleted}>Remove completed</button>
          <button type="button" onClick={handleDeleteAll}>
            Remove ALL
          </button>
        </div>
      </main>
    </div>
  );
}
