import { useState, useRef, useEffect } from "react";
import Task from "./components/Task";

const STORAGE_KEY = "my tasks";

export default function App() {
  const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const [tasks, setTasks] = useState(storedTasks || {});

  const inputRef = useRef(null);

  //functions
  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    } // prevents adding empty tasks
    let taskID = crypto.randomUUID();
    let inputValue = inputRef.current.value;

    setTasks((currentTasks) => {
      return { ...currentTasks, [taskID]: inputValue };
    });

    inputRef.current.value = "";
  }

  function handleDeleteAll() {
    if (Object.keys(tasks).length === 0) {
      return;
    } // prevents multiple "delete all" clicks in a row
    setTasks({});
  }

  //Local Storage functions:
  function saveTasksinLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Effects:
  useEffect(() => {
    saveTasksinLocalStorage();
  }, [tasks]);

  return (
    <div>
      <h1>To Do App</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Add task</button>
        <button type="button" onClick={handleDeleteAll}>
          Delete ALL tasks
        </button>
      </form>
      <ol>
        {Object.entries(tasks).map(([taskId, task]) => (
          <Task key={taskId} taskId={taskId} task={task} setTasks={setTasks} />
        ))}
      </ol>
    </div>
  );
}
