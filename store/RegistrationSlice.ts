import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";

const fetchRegistration = createAsyncThunk(
    'name/fetchregistration',
    async function (dataRegistr) {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
        })
        const data = await response.json();
        return data;
    }
)