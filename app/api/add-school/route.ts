import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import type { ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const name = data.get("name") as string;
    const address = data.get("address") as string;
    const city = data.get("city") as string;
    const state = data.get("state") as string;
    const contact = data.get("contact") as string;
    const email_id = data.get("email_id") as string;
    const file = data.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image found" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;

    const folderPath = path.join(process.cwd(), "public", "schoolImages");
    const filePath = path.join(folderPath, filename);

    await mkdir(folderPath, { recursive: true });
    await writeFile(filePath, buffer);

    // RAW SQL Query
    const sql = `
      INSERT INTO schools (name, address, city, state, contact, email_id, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [name, address, city, state, contact, email_id, filename];

    const [result] = await pool.query<ResultSetHeader>(sql, values);

    return NextResponse.json({
      success: true,
      school: { id: result.insertId, ...values },
    });
  } catch (error) {
    console.error("BACKEND ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server Error occurred" },
      { status: 500 }
    );
  }
}
