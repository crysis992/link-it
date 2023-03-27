"use client"

import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { fetchUser } from '@/redux/features/users/userSlice'

store.dispatch(fetchUser())

function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default StoreProvider