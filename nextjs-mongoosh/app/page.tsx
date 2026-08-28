import { createTask, getTasks } from "./actions";
import TaskItem from "@/models/TaskItem";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-black tracking-tight text-gray-900">Task Management App</h1>

      {/* CREATE FORM */}
      <form action={createTask} className="flex flex-col bg-gray-50 border p-5 rounded-xl gap-4 shadow-inner">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Add New Task</h2>
        <input
          name="title"
          type="text"
          placeholder="Task Title..."
          className="border border-gray-300 p-2.5 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <textarea
          name="description"
          placeholder="Task Details/Description..."
          className="border border-gray-300 p-2.5 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          required
        />
        <button type="submit" className="bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
          Add Task
        </button>
      </form>

      {/* READ LIST */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Your Current Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No tasks found. Create one above!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
