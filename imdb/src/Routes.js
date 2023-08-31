import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}