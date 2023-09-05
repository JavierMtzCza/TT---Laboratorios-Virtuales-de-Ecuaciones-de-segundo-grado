import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import './index.css'

import main from "./routes/main.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={main} />,
)
