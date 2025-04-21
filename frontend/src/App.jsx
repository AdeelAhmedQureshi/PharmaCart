import { Navbar } from '../Components/Navbar'
import { Login } from '../Components/LogIn'
import { SignUp } from '../Components/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Navbar/>}></Route> add homepage here */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/signup' element={ <SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
