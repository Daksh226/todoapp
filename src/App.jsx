import React, { useEffect, useState } from "react";

function App() {
  const [singletodo, setSingletodo] = useState({ title: "", desc: "", done: false });
  const [alltodos, setAlltodos] = useState([]);

  function handleAddTodo() {
    setAlltodos(prevTodos => {
      const updatedTodos = [...prevTodos, singletodo];
      savetodolocalstore(updatedTodos);
      return updatedTodos;
    });
    setSingletodo({ title: "", desc: "", done: false }); // Reset input fields
  }

  function deleteTodo(index) {
    const updatedTodos = alltodos.filter((_, i) => i !== index);
    setAlltodos(updatedTodos);
    savetodolocalstore(updatedTodos);
  }

  function toggleDone(index) {
    const updatedTodos = alltodos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setAlltodos(updatedTodos);
    savetodolocalstore(updatedTodos);
  }

  function savetodolocalstore(todo) {
    localStorage.setItem("todos", JSON.stringify(todo));
  }

  function gettodofromlocalstore() {
    let data = JSON.parse(localStorage.getItem("todos")) || [];
    setAlltodos(data);
  }

  useEffect(() => {
    gettodofromlocalstore();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "white", marginBottom: "20px" }}>Todo App</h1>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          width: "60%",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={singletodo.title}
          onChange={(e) =>
            setSingletodo({ ...singletodo, title: e.target.value })
          }
          style={{
            padding: "12px",
            width: "80%",
            borderRadius: "8px",
            border: "none",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={singletodo.desc}
          onChange={(e) =>
            setSingletodo({ ...singletodo, desc: e.target.value })
          }
          style={{
            padding: "12px",
            width: "80%",
            borderRadius: "8px",
            border: "none",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
        <br />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "12px 25px",
            margin: "10px",
            background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.3s",
          }}
        >
          Add Todo
        </button>
      </div>

      <div style={{ marginTop: "20px", width: "60%" }}>
        {alltodos.map((todo, index) => (
          <div
            key={index}
            style={{
              background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
              padding: "15px",
              margin: "15px auto",
              borderRadius: "12px",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              transition: "0.3s",
            }}
          >
            <h2
              style={{
                margin: "0",
                color: todo.done ? "#aaa" : "#333",
                textDecoration: todo.done ? "line-through" : "none",
                transition: "0.3s",
              }}
            >
              {index + 1}. {todo.title}
            </h2>
            <p
              style={{
                margin: "5px 0",
                color: todo.done ? "#bbb" : "#555",
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.desc}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => toggleDone(index)}
                style={{
                  padding: "8px 15px",
                  background: todo.done
                    ? "linear-gradient(135deg, #6a11cb, #2575fc)"
                    : "linear-gradient(135deg, #00b09b, #96c93d)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                {todo.done ? "Undo" : "Mark as Done"}
              </button>

              <button
                onClick={() => deleteTodo(index)}
                style={{
                  padding: "8px 15px",
                  background: "linear-gradient(135deg, #ff512f, #dd2476)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
