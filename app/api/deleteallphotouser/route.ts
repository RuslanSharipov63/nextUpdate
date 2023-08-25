const fs = require('fs')
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const imageURL = formData.get("imageURL") as string;
    const imageURLArray = JSON.parse(imageURL);
    try {
        imageURLArray.forEach((item: string) => {
            fs.unlink(`./public${item}`, () => { })
        })
        return NextResponse.json({ succes: true });
    } catch (error) {
        return NextResponse.json({ succes: false });
    }
}