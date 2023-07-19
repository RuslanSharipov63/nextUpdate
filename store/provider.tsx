"use client"

import { store } from './store';
import { Provider } from 'react-redux';


export const ReduxProvider = ({ children }: { children: any }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}