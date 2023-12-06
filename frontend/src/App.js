import logo from './logo.svg';
import './App.css';
import Navigation from './customer/components/navigation/Navigation';
import HomePage from './customer/homepage/HomePage';
import Footer from './customer/components/footer/Footer';
import Product from './customer/components/product/Product';
import ProductDetails from './customer/components/product-details/ProductDetails';
import Cart from './customer/components/cart/Cart';
import Checkout from './customer/components/checkout/Checkout';
import Orders from './customer/components/orders/Orders';
import OrderDetails from './customer/components/orders/OrderDetails';
import { Route, Routes } from 'react-router-dom';
import CustomerRoutes from './routing/CustomerRoutes';
import AdminRoutes from './routing/AdminRoutes';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/*' element={<CustomerRoutes/>}></Route>
        <Route path='/admin/*' element={<AdminRoutes/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
