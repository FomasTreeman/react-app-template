import { createContext, useState } from 'react';

export const GlobalContext = createContext([]);
const GlobalContextProvider = ({subPages}) => {
    const [toasts, setToasts] = useState([]);
    return (
        <GlobalContext.Provider value={[toasts, setToasts]}>
            {subPages}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider;