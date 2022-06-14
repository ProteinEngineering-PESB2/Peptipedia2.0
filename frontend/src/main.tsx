import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import "proseqviewer/dist/assets/proseqviewer.css"
import "react-alice-carousel/lib/alice-carousel.css"
// import "react-alice-carousel/lib/scss/alice-carousel.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
