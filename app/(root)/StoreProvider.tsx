"use client"

import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { fetchUser } from '@/redux/features/users/userSlice'
import { memo } from 'react'

function StoreProvider({ children }: { children: React.ReactNode }) {
    store.dispatch(fetchUser());

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default memo(StoreProvider)