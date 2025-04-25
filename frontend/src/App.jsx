import { Navbar } from '../Components/Navbar'
import { Login } from '../Components/LogIn'
import { SignUp } from '../Components/SignUp'
import Dashboard from '../Components/Dashboard';
import AddProduct from '../Components/AddProduct';
import DeleteProduct from '../Components/DeleteProduct';
import UpdateProduct from '../Components/UpdateProduct';

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/deleteproduct" element={<DeleteProduct />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
