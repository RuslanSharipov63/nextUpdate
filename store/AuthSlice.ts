import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: string,

}

const initialState = {
    value: {
        isAuth: false,
        username: '',
        uid: "",

    } as AuthState,
} as InitialState;

export const Auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    }
}) 