import { useRef, useContext, useState } from "react";
import Task from "./components/Task";
import { TasksContext } from "./contexts/TasksContext";
import ThemeButtons from "./components/ThemeButtons";
import { ThemeContext } from "./contexts/ThemeContext";

export default function App() {
  const {
    tasks,
    deleteAllTasks,
    deleteCompletedTasks,
    addNewTaskFromInput,
    getTasksOfSelectedCategory,
  } = useContext(TasksContext);
  const [taskCategory, setTaskCategory] = useState("all");
  const inputRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  // calculate number of all, completed, active tasks
  const allTasksNum = Object.keys(tasks).length;
  const completedTasksNum = Object.values(tasks).filter((task) => task.completed === true).length;
  const activeTasksNum = allTasksNum - completedTasksNum;

  const tasksToDisplay = getTasksOfSelectedCategory(taskCategory);

  //Functions
  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    addNewTaskFromInput(inputRef);
    inputRef.current.value = "";
  }

  return (
    <div className="app-container" style={{ backgroundImage: `url(${theme}.jpg)` }}>
      <div className={`overlay-container ${Object.keys(tasks).length > 0 ? "overlay" : undefined}`}>
        <header className="header-container">
          <ThemeButtons />
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
          {Object.keys(tasks).length > 0 && (
            <>
              <ul className="tasks-list">
                {Object.entries(tasksToDisplay).map(([taskId, { task, completed }]) => (
                  <Task key={taskId} taskId={taskId} task={task} completed={completed} />
                ))}
              </ul>

              <div className="categories-deleteBtns__container">
                <button type="button" onClick={deleteAllTasks} className="button remove-button">
                  Remove all
                </button>
                <div className="categories__container">
                  <button
                    onClick={() => setTaskCategory("all")}
                    className={`button category-button ${
                      taskCategory === "all" ? "category-button-active" : undefined
                    }`}
                  >
                    All({allTasksNum})
                  </button>
                  <button
                    onClick={() => setTaskCategory("active")}
                    className={`button category-button ${
                      taskCategory === "active" ? "category-button-active" : undefined
                    }`}
                  >
                    Active({activeTasksNum})
                  </button>
                  <button
                    onClick={() => setTaskCategory("completed")}
                    className={`button category-button ${
                      taskCategory === "completed" ? "category-button-active" : undefined
                    }`}
                  >
                    Completed({completedTasksNum})
                  </button>
                </div>

                <button
                  onClick={deleteCompletedTasks}
                  disabled={!completedTasksNum}
                  className="button remove-button"
                >
                  Remove completed
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
