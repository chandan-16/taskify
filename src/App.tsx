import { useEffect, useState } from "react";

import type { Task } from "./types/task";
import type { TaskFilter as TaskFilterType } from "./types/filter";

import "./App.css";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskStats from "./components/TaskStats";
import TaskFilter from "./components/TaskFilterButtons";
import TaskSearch from "./components/TaskSearch";

import { getTaskStats } from "./utils/taskStats";

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

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return initialTasks;
  });

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [filter, setFilter] = useState<TaskFilterType>("all");

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const { total, active, completed } = getTaskStats(tasks);

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
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "active") {
      return !task.completed && matchesSearch;
    }

    if (filter === "completed") {
      return task.completed && matchesSearch;
    }

    return matchesSearch;
  });

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

      <TaskStats total={total} active={active} completed={completed} />

      <TaskFilter
        filter={filter}
        allCount={total}
        activeCount={active}
        completedCount={completed}
        onFilterChange={setFilter}
      />

      <TaskSearch search={search} onSearchChange={setSearch} />

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}

export default App;
