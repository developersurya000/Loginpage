import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './login.jsx'
import { Register } from './Register.jsx'
import { Edit } from './edit.jsx'
import { Home } from './home.jsx'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}