const fs = require("fs");
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  try {
    fs.rmdir(`./public/image/accounts/${id}`, () => {});
    return NextResponse.json({ succes: true });
  } catch (error) {
    return NextResponse.json({ succes: false });
  }
}
