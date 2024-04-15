import { useState, useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";
import { BsPencilFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

export default function Task({ taskId, task, completed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const { setTasks } = useContext(TasksContext);

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
          className="editing-input"
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
            id={taskId}
            className="task-checkbox"
            onChange={handleTaskCheck}
          />
          <label htmlFor={taskId} className="task-text">
            {task}
          </label>
        </div>
      )}

      <div className="edit-delete-btns__container">
        <button onClick={handleEditTask} className="button task-manage-button">
          <BsPencilFill className="task-manage-icon" />
        </button>

        <button
          onClick={handleDeleteTask}
          className="button task-manage-button"
        >
          <VscChromeClose className="task-manage-icon" />
        </button>
      </div>
    </li>
  );
}
