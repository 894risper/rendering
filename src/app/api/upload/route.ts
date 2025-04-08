import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/file.model";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer to store files in "public/uploads/"
const upload = multer({ dest: "public/uploads/" });

export async function POST(req: Request) {
  await connectMongoDB();

  // Parse the uploaded file
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const filePath = `public/uploads/${file.name}`;

  // Save file to server
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Save file metadata in MongoDB
  const newFile = new File({
    filename: file.name,
    path: `/uploads/${file.name}`,
  });

  await newFile.save();

  return NextResponse.json({ message: "File uploaded successfully!" });
}
