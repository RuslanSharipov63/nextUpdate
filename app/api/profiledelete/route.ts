const fs = require("fs");
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  try {
    fs.rmSync(`./public/image/accounts/${id}`, { recursive: true, force: true }, () => {});
    return NextResponse.json({ succes: true });
  } catch (error) {
    return NextResponse.json({ succes: false });
  }
}
