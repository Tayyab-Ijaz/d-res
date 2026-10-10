import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
// Global styles load AFTER the app so they keep the same cascade order as before.
import "./styles/global.css"
import "./styles/tools-legacy.css"
import "./components/layout/header.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
