import './App.css'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route index element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
