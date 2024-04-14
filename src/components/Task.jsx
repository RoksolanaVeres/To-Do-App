import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { TasksContext } from "../contexts/TasksContext";
import DeleteIcon from "../assets/icons/delete-icon.svg";
import EditIcon from "../assets/icons/edit-icon.svg";

export default function Task({ task, taskId, completed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const { theme } = useContext(ThemeContext);
  const { tasks, setTasks } = useContext(TasksContext);

  console.log(tasks);

  // functions
  function handleDeleteTask() {
    setTasks((currentTasks) => {
      const updatedTasks = { ...currentTasks };
      delete updatedTasks[taskId];
      return updatedTasks;
    });
  }

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleEditInputChange(e) {
    setEditedTask(e.target.value);
  }

  function handleEditSave(e) {
    if (e.key === "Enter") {
      if (editedTask === "") {
        return;
      }

      setIsEditing(false);

      setTasks((currentTasks) => {
        const newTasks = { ...currentTasks };
        newTasks[taskId].task = editedTask;
        newTasks[taskId].completed = false;
        return newTasks;
      });
    }
  }

  function handleTaskCheck(e) {
    setTasks((currentTasks) => {
      const newTasks = { ...currentTasks };
      newTasks[taskId].completed = e.target.checked;

      return newTasks;
    });
  }

  return (
    <li className="task-li">
      {isEditing ? (
        <input
          type="text"
          onChange={handleEditInputChange}
          onKeyDown={handleEditSave}
          value={editedTask}
        />
      ) : (
        <div className="task-check__container">
          <input
            type="checkbox"
            checked={completed}
            id={task}
            className="task-checkbox"
            onChange={handleTaskCheck}
          />
          <label htmlFor={task} className="task-text">
            {task}
          </label>
        </div>
      )}

      <div className="edit-delete-btns__container">
        <button onClick={handleEditTask} className="button">
          <img src={EditIcon} className="task-manage-button" alt="" />
        </button>

        <button onClick={handleDeleteTask} className="button">
          <img src={DeleteIcon} className="task-manage-button" alt="" />
        </button>
      </div>
    </li>
  );
}
