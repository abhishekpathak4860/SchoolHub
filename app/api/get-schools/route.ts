import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const sql = `SELECT * FROM schools ORDER BY id DESC`;

    const [rows] = await pool.query(sql);

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
