import { Target, } from "@prisma/client"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    name: '',
    links: [],
}

const linktreeSlice = createSlice({
    name: 'linktree',
    initialState,
    reducers: {
        // @ts-ignore
        linkAdded: {
            reducer: (state, action: PayloadAction<string>) => {
                state.name = action.payload;
            }
        }
    }

})

export default linktreeSlice.reducer;