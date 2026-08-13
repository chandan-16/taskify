import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
