import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    const email = formData.get("email") as string | null;
    if (!file || !email) {
        return NextResponse.json(
            { error: "File blob and email is required." },
            { status: 400 }
        );
    }

    try {

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = join("public", 'image', 'accounts');
        const pathURL = await writeFile(`${uploadDir}/${file.name}`, buffer);
        return NextResponse.json(
            { fileUrl: pathURL });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Удалось сохранить файл'});
    }


}