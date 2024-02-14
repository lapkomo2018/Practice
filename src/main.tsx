import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {AuthProvider} from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
)
