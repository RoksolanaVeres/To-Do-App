import { useState, useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";
import { BsPencilFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

export default function Task({ taskId, taskText, completed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(taskText);
  const { deleteSelectedTask, saveEditedTask, toggleTaskStatus } = useContext(TasksContext);

  // functions
  function handleEditTaskClick() {
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
      saveEditedTask(taskId, editedTask);
    }
  }

  return (
    <>
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
            onChange={() => toggleTaskStatus(taskId)}
          />
          <label htmlFor={taskId} className="task-text">
            {taskText}
          </label>
        </div>
      )}

      <div className="edit-delete-btns__container">
        <button onClick={handleEditTaskClick} className="button task-manage-button">
          <BsPencilFill className="task-manage-icon" />
        </button>

        <button onClick={() => deleteSelectedTask(taskId)} className="button task-manage-button">
          <VscChromeClose className="task-manage-icon" />
        </button>
      </div>
    </>
  );
}
