import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/homepage/HomePage'
import Cart from '../customer/components/cart/Cart'
import Navigation from '../customer/components/navigation/Navigation'
import Footer from '../customer/components/footer/Footer'
import Product from '../customer/components/product/Product'
import ProductDetails from '../customer/components/product-details/ProductDetails'
import Checkout from '../customer/components/checkout/Checkout'
import Orders from '../customer/components/orders/Orders'
import OrderDetails from '../customer/components/orders/OrderDetails'
import PaymentSuccess from '../customer/components/payment/PaymentSuccess'

const CustomerRoutes = () => {
  return (
    <div>
        <div>
            <Navigation/>
        </div>
        <Routes>

            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/login' element={<HomePage/>}></Route>
            <Route path='/register' element={<HomePage/>}></Route>

            <Route path='/cart' element={<Cart/>}></Route>

            <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route>
            <Route path='/:levelOne/:levelTwo/:levelThree/login' element={<Product/>}></Route>
            <Route path='/:levelOne/:levelTwo/:levelThree/register' element={<Product/>}></Route>

            <Route path='/product/:productId' element={<ProductDetails/>}></Route>
            <Route path='/product/:productId/login' element={<ProductDetails/>}></Route>
            <Route path='/product/:productId/register' element={<ProductDetails/>}></Route>

            <Route path='/checkout' element={<Checkout/>}></Route>

            <Route path='/account/orders' element={<Orders/>}></Route>

            <Route path='/account/orders/:orderId' element={<OrderDetails/>}></Route>

            <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>
            
        </Routes>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default CustomerRoutes