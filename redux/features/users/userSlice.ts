"use client"
import { Target, } from "@prisma/client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

type User = {
    id: string,
    name: string,
    username: string,
    bio: string | null,
    profileImage: string | null,
    role: 'user' | 'admin',
    targets: Target[],
}

type State = {
    user: User | null,
    status: 'loading' | 'authenticated' | 'guest'
    error: string | undefined | null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    console.log('Fetching user from database...');
    const response = await fetch('/api/profile');
    return response.json();
})

const initialState: State = {
    user: null,
    status: 'loading',
    error: null
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'guest'
            } else {
                state.status = 'authenticated';
                state.user = action.payload;
            }
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = 'guest';
            state.error = action.error.message;
        });
    }
})

export const selectUser = (state: { user: State }) => state.user.user;

export default usersSlice.reducer;