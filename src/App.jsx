import { useRef, useContext, useState } from "react";
import Task from "./components/Task";
import { TasksContext } from "./contexts/TasksContext";
import ThemeButtons from "./components/ThemeButtons";
import { ThemeContext } from "./contexts/ThemeContext";
import { Reorder } from "framer-motion";

export default function App() {
  const {
    tasks,
    setTasks,
    deleteAllTasks,
    deleteCompletedTasks,
    addNewTaskFromInput,
    getTasksOfSelectedCategory,
  } = useContext(TasksContext);

  console.log(tasks);

  const [taskCategory, setTaskCategory] = useState("all");
  const inputRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  // calculate number of all, completed, active tasks
  // const allTasksNum = Object.keys(tasks).length;
  // const completedTasksNum = Object.values(tasks).filter((task) => task.completed === true).length;
  // const activeTasksNum = allTasksNum - completedTasksNum;

  function hideTasksOfOtherCategories(task) {
    if (
      (taskCategory === "completed" && !task.completed) ||
      (taskCategory === "active" && task.completed)
    ) {
      return "hidden-task";
    }
  }

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
      <div className={`overlay-container ${tasks.length > 0 ? "overlay" : undefined}`}>
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
          {tasks.length > 0 && (
            <>
              <Reorder.Group values={tasks} onReorder={setTasks} className="tasks-list">
                {tasks.map((task) => (
                  <Reorder.Item
                    key={task.taskId}
                    value={task}
                    className={`task-li visible-task ${hideTasksOfOtherCategories(task)} `}
                  >
                    <Task
                      taskId={task.taskId}
                      taskText={task.taskText}
                      completed={task.completed}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>

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
                    All()
                  </button>
                  <button
                    onClick={() => setTaskCategory("active")}
                    className={`button category-button ${
                      taskCategory === "active" ? "category-button-active" : undefined
                    }`}
                  >
                    Active()
                  </button>
                  <button
                    onClick={() => setTaskCategory("completed")}
                    className={`button category-button ${
                      taskCategory === "completed" ? "category-button-active" : undefined
                    }`}
                  >
                    Completed()
                  </button>
                </div>

                <button
                  onClick={deleteCompletedTasks}
                  // disabled={!completedTasksNum}
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
