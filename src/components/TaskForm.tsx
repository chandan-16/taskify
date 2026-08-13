import { useState, useEffect, type FormEvent } from "react";

type TaskFormProps = {
  onCreate: (title: string) => void;
  onSave?: (title: string) => void;
  initialTitle?: string;
  isEditing?: boolean;
  onCancel?: () => void;
};

export default function TaskForm({
  onCreate,
  onSave,
  initialTitle,
  isEditing = false,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle ?? "");

  useEffect(() => {
    setTitle(initialTitle ?? "");
  }, [initialTitle]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    if (isEditing) {
      onSave?.(trimmedTitle);
    } else {
      onCreate(trimmedTitle);
    }

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit">{isEditing ? "Save" : "Add Task"}</button>

        {isEditing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
