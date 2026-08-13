import type { Task } from "./types/task";
type TaskFilter = "all" | "active" | "completed";

import "./App.css";
import TaskList from "./components/TaskList";
import { useState } from "react";
import TaskForm from "./components/TaskForm";

function App() {
  const initialTasks: Task[] = [
    {
      id: 1,
      title: "Learn React",
      completed: false,
    },
    {
      id: 2,
      title: "Learn Typescript",
      completed: false,
    },
    {
      id: 3,
      title: "Build Task Manager",
      completed: true,
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [filter, setFilter] = useState<TaskFilter>("all");

  const handleToggle = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const handleCreate = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const handleEdit = (id: number) => {
    setEditingTaskId(id);
  };

  const editingTask = tasks.find((task) => task.id === editingTaskId);

  const handleSaveEdit = (newTitle: string) => {
    if (editingTaskId === null) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTaskId ? { ...task, title: newTitle } : task,
      ),
    );
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const allCount = tasks.length;

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <>
      <h1>Task Manager</h1>

      <TaskForm
        onCreate={handleCreate}
        isEditing={editingTaskId !== null}
        onSave={handleSaveEdit}
        initialTitle={editingTask?.title}
        onCancel={handleCancelEdit}
      />

      <div>
        <button onClick={() => setFilter("all")}>All ({allCount}) </button>
        <button onClick={() => setFilter("active")}>Active ({allCount})</button>
        <button onClick={() => setFilter("completed")}>
          Completed ({allCount})
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
    </>
  );
}

export default App;
