import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import produce, { Draft } from "immer"

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
}

const initialState = [
    { id: '1', title: 'test title', content: 'test content', userId: '1' },
    { id: '2', title: 'test title2', content: 'test content', userId: '0' },
    { id: '3', title: 'test title3', content: 'test content', userId: '2' },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded(state, action) {
        //     state.push(action.payload)
        // }
        postAdded: {
            reducer: (state: Draft<Post[]>, action: PayloadAction<Post>) => {
                state.push(action.payload)
            },
            prepare: (title: string, content: string, userId: string): { payload: Post } => ({
                payload: {
                    id: nanoid(),
                    title,
                    content,
                    userId,
                },
            }),
        },
    },
})

export const selectAllPosts = (state: { posts: Post[]; }) => state.posts;

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer