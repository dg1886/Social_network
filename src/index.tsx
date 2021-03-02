
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";
import { Provider } from 'react-redux';

// import StoreContext, {Provider} from "./StoreContext";

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                <App
                    // state={store.getState()}
                    //  dispatch = {store.dispatch.bind(store)}
                    //  store={store}
                />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );


// store.subscribe(rerenderEntireTree)
// rerenderEntireTree()

/*
<StoreContext.Provider value={store}>
    <App
    // state={store.getState()}
    //  dispatch = {store.dispatch.bind(store)}
    //  store={store}
    />
    </StoreContext.Provider>*/
