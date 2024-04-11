import { useState } from "react";

export default function Task({ task, taskId, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

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
        return { ...currentTasks, [taskId]: editedTask };
      });
    }
  }

  return (
    <li onDoubleClick={handleEditTask}>
      {isEditing ? (
        <input
          type="text"
          onChange={handleEditInputChange}
          onKeyDown={handleEditSave}
          value={editedTask}
        />
      ) : (
        <span>{task}</span>
      )}

      <button onClick={handleDeleteTask}>delete</button>
    </li>
  );
}
