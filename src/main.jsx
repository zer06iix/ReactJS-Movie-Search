// import { StrictMode } from 'react'
// import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import Movies from './components/Movies'

createRoot(document.getElementById('root')).render(
    <Movies />
)
