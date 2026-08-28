"use server";

import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";

// 1. READ: Fetch all tasks
export async function getTasks() {
  await dbConnect();
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    // Map over tasks to convert MongoDB BSON IDs/Dates into simple string types for Server Components
    return tasks.map(task => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
    }));
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

// 2. CREATE: Add a new task
export async function createTask(formData: FormData) {
  await dbConnect();
  const title = formData.get("title");
  const description = formData.get("description");

  if (!title || !description) return;

  try {
    await Task.create({ title, description });
    revalidatePath("/"); // Refreshes the homepage cache data
  } catch (error) {
    console.error("Failed to create task:", error);
  }
}

// 3. UPDATE: Edit an existing task
export async function updateTask(id: string, formData: FormData) {
  await dbConnect();
  const title = formData.get("title");
  const description = formData.get("description");

  try {
    await Task.findByIdAndUpdate(id, { title, description });
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update task:", error);
  }
}

// 4. DELETE: Remove a task
export async function deleteTask(id: string) {
  await dbConnect();
  try {
    await Task.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}
