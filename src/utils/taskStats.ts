import type { Task } from "../types/task";

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;

  const active = tasks.filter(
    (task) => !task.completed
  ).length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  return {
    total,
    active,
    completed,
  };
}