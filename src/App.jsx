import { Routes, Route } from 'react-router-dom'
import ProductList from "./pages/ProductList"
import CartList from './pages/CartList'
import ProductDetails from './pages/Products'
import Home from './pages/Home'

const App = () => {
  return (
    <>

    <Routes>

      <Route path='/products' element = {<ProductList/>}/>
      <Route path='/' element = {<Home/>} ></Route>
      <Route path='/cart' element={<CartList/>} />
      <Route path='/product-details/:id' element ={<ProductDetails/>} ></Route>


    </Routes>
    
    
    </>
  )
}

export default App