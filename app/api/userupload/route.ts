import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile, copyFile } from "fs/promises";
import bear from './../../../public/image/accounts/bear.jpg';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob | null;
  const userId = formData.get("id") as string;
  const pathNewDir = join("public", "image", "accounts");
  await mkdir(`${pathNewDir}/${userId}`)
  const uploadDir = join(pathNewDir, userId)
  if (!file) {
    await copyFile(`${pathNewDir}/bear.jpg`, `${uploadDir}/bear.jpg`);
    return NextResponse.json({ fileUrl: "ok" });
  }
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(`${uploadDir}/${file.name}`, buffer);
    return NextResponse.json({ fileUrl: "ok" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Не удалось сохранить файл" });
  }
}
