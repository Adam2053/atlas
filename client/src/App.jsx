
import './App.css'
import Country from './components/Country'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Atlas from './components/Atlas'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element={<Home />} />
        <Route path= '/country' element={<Country />} />
        <Route path= '/atlas' element={<Atlas />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
