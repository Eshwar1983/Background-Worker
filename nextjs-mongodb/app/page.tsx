import { getTasks } from "./actions";
import TaskList from "./TaskList";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tasks = await getTasks();

  return (
    <main style={{ padding: "20px" }}>
      <TaskList initialTasks={tasks} />
    </main>
  );
}
