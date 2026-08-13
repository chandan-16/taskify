import type { Task } from "../types/task";

type TaskCardProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskCardProps) {
  return (
    <div>
      <h3>{task.title}</h3>

      <p>{task.completed ? "✓ Completed" : "○ Pending"}</p>

      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Mark Pending" : "Completed"}
      </button>

      <button onClick={() => onDelete(task.id)}>Delete</button>

      <button onClick={() => onEdit(task.id)}>Edit</button>
    </div>
  );
}
