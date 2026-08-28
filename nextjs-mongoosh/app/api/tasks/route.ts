import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";

// GET handler: Fetch all tasks
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST handler: Create a new task
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const task = await Task.create(body);
    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
