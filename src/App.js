import React from 'react';
import './App.css';
import {Question} from "./pages/Questions"; // 导入样式文件

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Question/>
            </header>
        </div>
    );
}

export default App;