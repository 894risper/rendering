import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";  
import File from "../../../../models/file.model";

export async function GET() {
  await connectMongoDB();
  const files = await File.find();
  return NextResponse.json({ files });
}
