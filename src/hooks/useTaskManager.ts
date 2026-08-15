import { useState } from "react";

import type { Task } from "../types/task";
import type { TaskFilter } from "../types/filter";

import { useLocalStorage } from "./useLocalStorage";

import { filterTasks } from "../utils/filterTasks";
import { getTaskStats } from "../utils/taskStats";

import { initialTasks } from "../data/initialTasks";


export function useTaskManager() {
  // Task state
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "tasks",
    initialTasks,
  );

  // Editing state
  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  // Filter and search state
  const [filter, setFilter] =
    useState<TaskFilter>("all");

  const [search, setSearch] = useState("");

  // Task operations
  const createTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id,
      ),
    );
  };

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const updateTask = (
    id: number,
    newTitle: string,
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
            }
          : task,
      ),
    );

    setEditingTaskId(null);
  };

  // Editing operations
  const startEditing = (id: number) => {
    setEditingTaskId(id);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  const editingTask = tasks.find(
    (task) => task.id === editingTaskId,
  );

  // Derived data
  const filteredTasks = filterTasks(
    tasks,
    filter,
    search,
  );

  const {
    total,
    active,
    completed,
  } = getTaskStats(tasks);

  return {
    tasks,

    total,
    active,
    completed,

    createTask,
    deleteTask,
    toggleTask,
    updateTask,

    startEditing,
    cancelEditing,
    editingTask,

    filter,
    setFilter,

    search,
    setSearch,

    filteredTasks,
  };
}