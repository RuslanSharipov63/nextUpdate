import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { mkdir, writeFile, copyFile, } from "fs/promises";
const fs = require('fs');
const path = require('path')

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    const userId = formData.get("id") as string;
   const pathNewDir = await join("public", "image", "accounts");
    const pathDir = await join("public", "image", "accounts", userId);

    fs.readdir(pathDir, (err: any, files: string[]) => {
        if (err) throw err;
        for (const pathFile of files) {
            fs.unlink(path.join(pathDir, pathFile), () => { })
        }
    })
    if (!file) {
        await copyFile(`${pathNewDir}/bear.jpg`, `${pathDir}/bear.jpg`);
        return NextResponse.json({ fileUrl: "ok" });
    }
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(`${pathDir}/${file.name}`, buffer);
        return NextResponse.json({ fileUrl: "ok" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Не удалось сохранить файл" });
    } 
}
