import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/file.model";
export async function POST (req:Request){
try{
    const {file} = await req.json();

    await connectMongoDB();
    await File.create({file})

}catch(error){
    return NextResponse.json({message:"An error occured while uploading"},{status:500})
}
}