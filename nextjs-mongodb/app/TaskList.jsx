"use client";

import { useState, useEffect } from "react";
import { createTask, updateTask, deleteTask } from "./actions";
import ConfirmModal from "@/components/ConfirmModal";

export default function TaskList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [alert, setAlert] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 3000);
  };

  const handleCreate = async (formData) => {
    // console.log('1.', formData);
    const res = await createTask(formData);
    if (res.success) {
      showAlert(res.message);
      document.getElementById("task-form").reset();
    }
  };

  const handleToggle = async (id, currentStatus) => {
    const res = await updateTask(id, { completed: !currentStatus });
    if (res.success) showAlert(res.message);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    const res = await updateTask(id, { title: editText, description: editDescription });
    if (res.success) {
      showAlert(res.message);
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    // console.log("Deleting task with ID:", id);
    setIsModalOpen(false);
    setDeleteId(null);
    const res = await deleteTask(id);
    if (res.success) showAlert(res.message);
  };

  const handleSubmit = async (formData) => {
    const res = await createTask(formData);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif" }}>
      {/* <h2>Task Manager</h2> */}

      {/* Dynamic Success Alert */}
      {alert && (
        <div style={{ padding: "10px", background: "#d4edda", color: "#155724", borderRadius: "5px", marginBottom: "15px", position: "fixed", top: "10%", right: "50%", zIndex: 1000 }}>
          ✓ {alert}
        </div>
      )}

      Create Form
      <form id="task-form" action={handleCreate} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input name="title" placeholder="Enter new task..." required className="border" style={{ flex: 1, padding: "8px" }} />
        <input name="description" placeholder="Enter description..." required className="border" style={{ flex: 1, padding: "8px" }} />
        <button type="submit" style={{ padding: "8px 15px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Add</button>
      </form>

      {/* Task List */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Task List</h2>
        <div className="inline-flex items-center gap-2">
          {/* <span className="text-sm text-gray-500">{tasks.filter(task => task.completed).length} completed</span> */}
          <span className="text-sm text-gray-500">|</span>
          <span className="text-sm text-gray-500">{tasks.length} {tasks.length === 1 ? "task" : "tasks"}</span>
          {/* <button onClick={() => { setAddModalOpen(true);}} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Add Task</button> */}
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ display: "flex", alignItems: "center", justifyContent: "between", padding: "10px 0", borderBottom: "1px solid #eee", gap: "10px" }}>
            {/* <input type="checkbox" checked={task.completed} onChange={() => handleToggle(task._id, task.completed)} /> */}
            
            {editingId === task._id ? (
              <div style={{ flex: 1, display: "flex", gap: "5px" }}>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} style={{ border: "1px solid #ccc", flex: 1 }} />
                <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={{ border: "1px solid #ccc", flex: 1 }} />
                <button onClick={() => handleSaveEdit(task._id)} style={{ background: "#28a745", color: "#fff", border: "none", padding: "2px 8px" }}>Save</button>
                <button onClick={() => setEditingId(null)} style={{ background: "#6c757d", color: "#fff", border: "none", padding: "2px 8px" }}>Cancel</button>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
                <span style={{ fontSize: "0.8em", color: "#666" }}>{task.description}</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button onClick={() => { setEditingId(task._id); setEditText(task.title); setEditDescription(task.description); }} style={{ background: "#ffc107", border: "none", padding: "2px 8px", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => { setIsModalOpen(true); setDeleteId(task._id); }} style={{ background: "#dc3545", color: "#fff", border: "none", padding: "2px 8px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Confirmation Modal Component */}
      <ConfirmModal
        isOpen={isModalOpen}
        deleteId={deleteId}
        title={`Delete Task permanently?`}
        message="Are you absolutely sure you want to delete?"
        confirmText="Yes, delete my account"
        cancelText="Cancel"
        onConfirm={() => handleDelete(deleteId)}
        onCancel={() => setIsModalOpen(false)}
      />
      {/* <CreateModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        // onSubmit={handleSubmit}
        // initialData={deleteTask}
      /> */}
    </div>
  );
}
// onClick={() => handleDelete(task._id)}