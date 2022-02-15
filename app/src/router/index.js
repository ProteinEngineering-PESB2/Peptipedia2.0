import { Routes, Route } from 'react-router-dom'

import Prueba from '../Prueba'
import Dashboard from '../pages/Dashboard'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Prueba/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}

export default Router