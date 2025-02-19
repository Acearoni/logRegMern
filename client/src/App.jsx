import './App.css'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route index element={<Register/>}/>

        <Route path='/home' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
