import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.bundle.min.js"

import "./assets/css/jquery.mCustomScrollbar.min.css"
import "./assets/css/style.css";
import "./assets/fonts/font-stylesheet.css";
import "./assets/fonts/fontAwesome/fontawesome-all.css";
import "simplebar-react/dist/simplebar.min.css";
import "../node_modules/@progress/kendo-theme-default/dist/all.css";
import './assets/css/grid.css'
// import "@progress/kendo-theme-default/dist/all.css";
// import "@progress/kendo-theme-default";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


