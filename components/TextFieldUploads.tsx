"use client";
import { FC } from "react";

type TextFieldUploadsProps = {
    typeText: string;
    funcChange: (e: any) => void
};

const TextFieldUploads: FC<TextFieldUploadsProps> = ({
    typeText,
    funcChange
}) => {

    return (
        <>
            <input
                type={typeText}
                accept="image/*, .png,.jpg,.gif,.web,"
                onChange={(e) => funcChange(e.target.files)}
            />
        </>
    );
};

export default TextFieldUploads;
