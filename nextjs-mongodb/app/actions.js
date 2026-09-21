"use server";

import { getCollection, ObjectId } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  try {
    const col = await getCollection("tasks");
    const tasks = await col.find({}).toArray();
    return tasks.map(t => ({ ...t, _id: t._id.toString() }));
  } catch (e) {
    return [];
  }
}

export async function createTask(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  if (!title) return { success: false, error: "Title required" };
  if (!description) return { success: false, error: "Description required" };

  const col = await getCollection("tasks");
  await col.insertOne({ title, description, completed: false });
  
  revalidatePath("/");
  return { success: true, message: "Task created successfully!" };
}

export async function updateTask(id, updates) {
  const col = await getCollection("tasks");
  await col.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  
  revalidatePath("/");
  return { success: true, message: "Task updated successfully!" };
}

export async function deleteTask(id) {
  const col = await getCollection("tasks");
  await col.deleteOne({ _id: new ObjectId(id) });
  
  revalidatePath("/");
  return { success: true, message: "Task deleted successfully!" };
}
