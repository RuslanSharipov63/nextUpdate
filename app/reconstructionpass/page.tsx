"use client"
import { useState } from "react";
import TextField from "@/components/TextField";

const ReconstructionPass = () => {
    const [valueInput, setValueInput] = useState('email')
    const handleChange = (value: string, name: string) => {
        setValueInput(value)
    }

    return (
        <div>
            <TextField
                typeText={'text'}
                nameText={'forgotpass'}
                funcChange={handleChange}
                idText={'forgotpass'}
                valueText={valueInput}
            />
        </div>
    );
}

export default ReconstructionPass;