type TaskSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function TaskSearch({
  search,
  onSearchChange,
}: TaskSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}
