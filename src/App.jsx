import { useRef, useContext, useState } from "react";
import Task from "./components/Task";
import { TasksContext } from "./contexts/TasksContext";
import ThemeButtons from "./components/ThemeButtons";
import { ThemeContext } from "./contexts/ThemeContext";
import { Reorder, AnimatePresence } from "framer-motion";
import { ACTIONS } from "./contexts/TasksContext";

export default function App() {
  const { tasksState, tasksDispatch, showTasksInNums } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);
  const [taskCategory, setTaskCategory] = useState("all");
  const inputRef = useRef(null);

  const { allTasksNum, activeTasksNum, completedTasksNum } = showTasksInNums();

  //Functions
  function setClassTohideTasksOfOtherCategories(task) {
    if (
      (taskCategory === "completed" && !task.completed) ||
      (taskCategory === "active" && task.completed)
    ) {
      return "hidden-task";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    tasksDispatch({ type: ACTIONS.ADD_NEW_TASK, payload: { inputText: inputRef.current.value } });
    inputRef.current.value = "";
  }

  return (
    <div className="app-container" style={{ backgroundImage: `url(${theme}.jpg)` }}>
      <div className={`overlay-container ${tasksState.length > 0 ? "overlay" : undefined}`}>
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
          {tasksState.length > 0 && (
            <>
              <Reorder.Group
                values={tasksState}
                onReorder={(newState) =>
                  tasksDispatch({ type: ACTIONS.REORDER_TASKS, payload: newState })
                }
                className="tasks-list"
              >
                <AnimatePresence>
                  {tasksState.map((task) => (
                    <Reorder.Item
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={task.taskId}
                      value={task}
                      className={`task-li visible-task ${setClassTohideTasksOfOtherCategories(
                        task
                      )} `}
                    >
                      <Task
                        key={task.taskId}
                        taskId={task.taskId}
                        taskText={task.taskText}
                        completed={task.completed}
                      />
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>

              {taskCategory === "active" && !activeTasksNum && (
                <p className="no-tasks__message">Congrats! You've completed all your tasks</p>
              )}
              {taskCategory === "completed" && !completedTasksNum && (
                <p className="no-tasks__message">You have no completed tasks yet :(</p>
              )}

              <div className="categories-deleteBtns__container">
                <button
                  type="button"
                  onClick={() => tasksDispatch({ type: ACTIONS.DELETE_ALL_TASKS })}
                  className="button remove-button"
                >
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
                  onClick={() => tasksDispatch({ type: ACTIONS.DELETE_COMPLETED_TASKS })}
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
