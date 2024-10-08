import React from 'react';
import ReactDom from 'react-dom/client';
import {Provider} from 'react-redux';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import store from "./store";


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);