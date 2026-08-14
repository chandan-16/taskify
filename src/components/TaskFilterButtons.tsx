type TaskFilter = "all" | "active" | "completed";

type TaskFilterProps = {
  filter: TaskFilter;
  allCount: number;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: TaskFilter) => void;
};

export default function TaskFilter({
  filter,
  allCount,
  activeCount,
  completedCount,
  onFilterChange,
}: TaskFilterProps) {
  return (
    <div>
      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => onFilterChange("all")}
      >
        All ({allCount})
      </button>

      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => onFilterChange("active")}
      >
        Active ({activeCount})
      </button>

      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
}
