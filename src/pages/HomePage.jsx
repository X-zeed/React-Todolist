import { useEffect, useState } from "react";
import NewTask from "../components/NewTask";
import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const addTask = async (task) => {
    setLoading(true);
    setTodos((prevTodos) => [
      ...prevTodos,
      { ...task, id: prevTodos.length + 1 },
    ]);
    await delay();
    setLoading(false);
    toast.success("Successfully added a new task!");
  };

  const deleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
    toast.warning("Successfully delete task!");
  };

  const updateTask = (task, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...task, id } : t))
    );
    toast.success("Successfully update task!");
  };

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  //       const data = await res.json();
  //       console.log(data);
  //       setUsers(data);
  //     } catch (err) {
  //       console.log("Error " + err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <>
      {/* {loading ? (
        <Spinner />
      ) : (
        users.map((user, i) => (
          <div key={i}>
            {user.id} {user.title}
          </div>
        ))
      )} */}
      <NewTask addTask={addTask} />

      {loading ? (
        <Spinner />
      ) : (
        todos.length > 0 && ( // ✅ แก้ไขตรงนี้จาก "lenght" เป็น "length"
          <ul className="bg-gray-200 rounded-md shadow-sm p-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                todo={todo}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default HomePage;
