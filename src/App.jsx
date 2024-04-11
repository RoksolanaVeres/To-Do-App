import { useState, useRef } from "react";

export default function App() {
  const [tasks, setTasks] = useState({
    2323232: "clean the room",
    46567: "learn React",
  });

  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    let taskID = crypto.randomUUID();
    let inputValue = inputRef.current.value;

    setTasks((currentTasks) => {
      return { ...currentTasks, [taskID]: inputValue };
    });

    inputRef.current.value = "";
  }

  console.log(tasks);

  return (
    <div>
      <h1>To Do App</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Add task</button>
      </form>
    </div>
  );
}
