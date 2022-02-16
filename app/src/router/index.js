import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Prueba from '../Prueba'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Prueba/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}

export default Router