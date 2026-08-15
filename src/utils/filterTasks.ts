import type { Task } from "../types/task";
import type { TaskFilter } from "../types/filter";

export function filterTasks(
  tasks: Task[],
  filter: TaskFilter,
  search: string,
): Task[] {
  const normalizedSearch = search.toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(normalizedSearch);

    if (filter === "active") {
      return !task.completed && matchesSearch;
    }

    if (filter === "completed") {
      return task.completed && matchesSearch;
    }

    return matchesSearch;
  });
}