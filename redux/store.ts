import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/users/userSlice'
import linktree from './features/linktree/linktreeSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        linktree: linktree,
    }
})