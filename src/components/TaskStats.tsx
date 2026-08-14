type TaskStatsProps = {
  total: number;
  active: number;
  completed: number;
};

export default function TaskStats({
  total,
  active,
  completed,
}: TaskStatsProps) {
  return (
    <div>
      <div>
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div>
        <h3>Active</h3>
        <p>{active}</p>
      </div>

      <div>
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>
    </div>
  );
}
