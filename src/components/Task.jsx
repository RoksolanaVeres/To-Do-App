import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Task({ task, taskId, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const { theme, setTheme } = useContext(ThemeContext);

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
    <li className="task" onDoubleClick={handleEditTask}>
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
