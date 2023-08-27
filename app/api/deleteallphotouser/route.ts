const fs = require("fs");
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const imageURL = formData.get("imageURL") as string;
  const imageURLArray = JSON.parse(imageURL);
  try {
    imageURLArray.forEach((item: string) => {
      fs.unlink(`./public${item}`, () => {});
    });
    return NextResponse.json({ succes: true });
  } catch (error) {
    return NextResponse.json({ succes: false });
  }
}

/* 
const itemArr = item.split("/");
        console.log(itemArr);
        delete itemArr[itemArr.length - 1];
        const itemPath = itemArr.join("/");
        console.log(itemPath);
        fs.readdir(itemPath, function (err: any, data: any) {
          if (data.length === 0) {
            fs.rmdir(itemPath, () => {});
          }
        }); */