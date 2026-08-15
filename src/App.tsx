import "./App.css";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskStats from "./components/TaskStats";
import TaskFilter from "./components/TaskFilterButtons";
import TaskSearch from "./components/TaskSearch";

import { useTaskManager } from "./hooks/useTaskManager";

function App() {
  const {
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
  } = useTaskManager();

  const handleSaveEdit = (newTitle: string) => {
    if (!editingTask) {
      return;
    }

    updateTask(editingTask.id, newTitle);
  };

  return (
    <>
      <h1>Task Manager</h1>

      <TaskForm
        onCreate={createTask}
        isEditing={editingTask !== undefined}
        onSave={handleSaveEdit}
        initialTitle={editingTask?.title}
        onCancel={cancelEditing}
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
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={startEditing}
        />
      )}
    </>
  );
}

export default App;
