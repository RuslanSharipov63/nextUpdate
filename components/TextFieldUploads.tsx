"use client";
import { FC } from "react";

type TextFieldUploadsProps = {
    typeText: string;
    funcChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    funcUploadChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const TextFieldUploads: FC<TextFieldUploadsProps> = ({
    typeText,
    funcChange,
    funcUploadChange
}) => {



    return (
        <>
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input
                        type={typeText}
                        accept="image/*, .png,.jpg,.gif,.web,"
                        onChange={funcUploadChange ? (e) => funcUploadChange(e) : (e) => funcChange?.(e)}
                    />
                </div>
            </div>
        </>
    );
};

export default TextFieldUploads;
