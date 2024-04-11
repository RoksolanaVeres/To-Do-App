import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState({
    2323232: "clean the room",
    46567: "learn React",
  });

  const [newTask, setNewTask] = useState("");

  function handleClick() {
    if (newTask === "") {
      return;
    }

    let taskID = crypto.randomUUID();
    setTasks((currentTasks) => {
      return { ...currentTasks, [taskID]: newTask };
    });
    setNewTask("");
  }

  function handleChange(e) {
    setNewTask(e.target.value);
  }

  console.log(tasks);

  return (
    <div>
      <h1>To Do App</h1>
      <input type="text" onChange={handleChange} value={newTask} />
      <button onClick={handleClick}>Add task</button>
    </div>
  );
}
