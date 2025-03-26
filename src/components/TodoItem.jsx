import { MdDelete, MdEdit } from "react-icons/md";
import { useRef, useState } from "react";

const TodoItem = (props) => {
  const dialog = useRef();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(props.todo.title);

  const openModal = (isEditing) => {
    setEditing(isEditing);
    dialog.current.showModal();
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (editing) {
      const task = {
        title: title,
        date: props.todo.date,
      };
      props.updateTask(task, props.id);
    } else {
      props.deleteTask(props.id);
    }

    closeModal();
  };

  const closeModal = () => {
    dialog.current.close();
  };

  const clickOutsideModal = (e) => {
    if (e.target === dialog.current) {
      closeModal();
    }
  };

  return (
    <>
      <li className="flex bg-white rounded shadow-sm p-4 mt-4 first:mt-0">
        <div className="flex gap-x-4 mr-auto items-center">
          <div className="h-6 w-6 rounded-full shadow-sm text-white text-sm bg-teal-400 text-center flex items-center justify-center">
            {props.id}
          </div>
          <div>
            <p className="font-semibold">{props.todo.title}</p>
            <p className="text-sm text-gray-400">{props.todo.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => openModal(false)}
            type="button"
            className="todo-btn"
          >
            <MdDelete size={20} />
          </button>

          <button
            onClick={() => openModal(true)}
            type="button"
            className="todo-btn"
          >
            <MdEdit size={20} />
          </button>
        </div>
      </li>

      {/* Modal Dialog */}
      <dialog
        ref={dialog}
        onClick={clickOutsideModal}
        className="rounded-md w-[480px] p-6 backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <form onSubmit={submitForm} className="p-6">
          <h3 className="font-semibold text-xl">
            {editing ? "Edit Task" : "Do you want to delete this task?"}
          </h3>
          <div className="mt-2">
            {editing ? (
              <input
                type="text"
                className="focus:outline-none w-full border rounder py-2 px-3"
                maxLength="30"
                placeholder="Type something here"
                autoFocus
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              "This will permanently delete this task."
            )}
          </div>
          <div className="mt-2 text-end space-x-2">
            <button
              onClick={closeModal}
              type="button"
              className="rounded border border-gray-200 px-3 py-2 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              type="submit"
              className={`rounded px-3 py-2 text-white ${
                editing
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {editing ? "Confirm" : "Delete"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TodoItem;
