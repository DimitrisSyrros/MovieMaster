import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import StoreProvider from './utils/store';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import WatchList from "./components/WatchList";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StoreProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/watchList" element={<WatchList/>}/>
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>
);


