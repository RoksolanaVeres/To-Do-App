import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export default function CategoryButtons({ taskCategory, setTaskCategory }) {
  const { tasks, setTasks } = useContext(TasksContext);

  // calculate number of all, completed, active tasks
  const allTasksNum = Object.keys(tasks).length;
  const completedTasksNum = Object.values(tasks).filter(
    (task) => task.completed === true
  ).length;
  const activeTasksNum = allTasksNum - completedTasksNum;

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
    <div className="category-remove__buttons-container">
      <div className="category-buttons__container">
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
      <div className="remove-buttons__container">
        <button onClick={handleRemoveCompleted} disabled={!completedTasksNum}>
          Remove completed
        </button>
        <button type="button" onClick={handleDeleteAll}>
          Remove ALL
        </button>
      </div>
    </div>
  );
}
