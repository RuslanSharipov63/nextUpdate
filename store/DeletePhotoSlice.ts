import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";

const fetchDeletePhoto = createAsyncThunk(
    'name/fetchdeletephoto',
    async function () {
        const response = await fetch(`${BASE_URL}/`)
    }
)