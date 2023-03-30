"use client"
import { LinkTree, Social, Target, } from "@prisma/client"
import { createSlice, createAsyncThunk, Draft, PayloadAction } from "@reduxjs/toolkit"

type User = {
    id: string,
    name: string,
    username: string,
    bio: string | null,
    profileImage: string | null,
    role: 'user' | 'admin',
    targets: Target[],
    socials: Social[],
    userlinks: LinkTree,
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
    reducers: {
        removeSocial: (state: Draft<State>, action: PayloadAction<string>) => {
            console.log(action.payload)
            state.user!.socials = state.user!.socials.filter((social) => social.provider !== action.payload)
        },
        addSocial: (state: Draft<State>, action: PayloadAction<Social>) => {
            const index = state.user!.socials.findIndex((entry) => entry.provider === action.payload.provider);
            if (index !== -1) {
                state.user!.socials[index].username = action.payload.username
            } else {
                state.user!.socials.push(action.payload)
            }
        },
        toggleSensitive: (state) => {
            state.user!.userlinks.sensitive = !state.user!.userlinks.sensitive;
        }
    },
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

export const { removeSocial, addSocial, toggleSensitive } = usersSlice.actions

export default usersSlice.reducer;