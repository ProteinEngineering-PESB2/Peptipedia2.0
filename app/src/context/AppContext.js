import { createContext, useReducer } from 'react'

import AppReducer from './AppReducer'

const initialState = {
    alignmentType: "",
    data: ""
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            { children }
        </AppContext.Provider>
    )
}