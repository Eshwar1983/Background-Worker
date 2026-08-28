"use client";

import { useState } from "react";
import { deleteTask, updateTask } from "@/app/actions";

interface TaskItemProps {
  task: { id: string; title: string; description: string };
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    await updateTask(task.id, formData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
      {isEditing ? (
        <form action={handleUpdate} className="flex flex-col gap-2 w-full mr-4">
          <input
            name="title"
            defaultValue={task.title}
            className="border p-1 rounded text-sm w-full"
            required
          />
          <input
            name="description"
            defaultValue={task.description}
            className="border p-1 rounded text-sm w-full"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded text-xs">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded text-xs">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex-1 mr-4">
          <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
        </div>
      )}

      {!isEditing && (
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600">
            Edit
          </button>
          <button onClick={async () => await deleteTask(task.id)} className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
