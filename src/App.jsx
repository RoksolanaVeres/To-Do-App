import { useState, useRef, useEffect, useContext } from "react";
import Task from "./components/Task";
import { ThemeContext } from "./contexts/ThemeContext";

const TASKS_STORAGE_KEY = "my tasks";

export default function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const storedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
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
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }

  // Effects:
  useEffect(() => {
    saveTasksinLocalStorage();
  }, [tasks]);

  return (
    <div className="app-container" data-theme={theme}>
      <div className="themes-container">
        <button onClick={() => setTheme("light")}>light</button>
        <button onClick={() => setTheme("dark")}>dark</button>
        <button onClick={() => setTheme("green")}>green</button>
      </div>
      <h1 className="header">To Do App</h1>
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
