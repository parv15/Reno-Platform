import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const image = formData.get("image") as File;

    let imagePath = "";
    if (image) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(process.cwd(), "public/schoolImages", fileName);
      fs.writeFileSync(filePath, bytes);
      imagePath = `/schoolImages/${fileName}`;
      console.log("Image saved to:", filePath , imagePath ,fileName);
    }

    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
    );

    return NextResponse.json({ message: "School added" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, name, address, city, image FROM schools");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching" }, { status: 500 });
  }
}