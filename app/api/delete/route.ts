const fs = require('fs')
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("fileName") as string;
  try {
    fs.unlink(`./public${file}`, () => {
      return NextResponse.json({ succes: true });
    });
  } catch (error) {
    return NextResponse.json({ succes: false });
  }
}
