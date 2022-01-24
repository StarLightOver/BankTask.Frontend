import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './Styles/index.css';
import App from './App';
import EditClient from "./Components/EditClient";
import CreateClient from "./Components/CreateClient";
import TableFounders from "./Components/TableFounders";
import CreateFounder from "./Components/CreateFounder";
import EditFounder from "./Components/EditFounder";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/create" element={<CreateClient/>}/>
                <Route path="/edit/:id" element={<EditClient/>}/>}/>
                <Route exact path="/founders" element={<TableFounders/>}/>
                <Route exact path="/founders/create" element={<CreateFounder/>}/>}/>
                <Route exact path="/founders/edit/:id" element={<EditFounder/>}/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
