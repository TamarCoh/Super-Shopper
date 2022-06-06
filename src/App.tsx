import * as React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { JsxElement } from "typescript";
import LogIn from './Components/LogIn';
import PurchaseList from './Components/PurchaseList';
import { lookup } from 'dns';
import SignUp from './Components/SignUp';
import Enter from './Components/Enter';
import Logo from './Components/Logo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Components/Nav';
import CategoriesNavigation from './Components/AllCategory';
import AllCategory from './Components/AllCategory';
import PreviosPurchases, { OrderDetails } from './Components/PreviousPurchases';
import { useDispatch, useSelector } from 'react-redux';
import { User } from './utils/modals';
import { logIn } from './store/Actions/User';
import { getPurchaseList } from './store/Actions/ProductInList';
import {IstatePro} from './store/Reducers/ProductInList'
import PurchaselistToSave from './Components/PurchaselistToSave';

function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem('user') != null) {
    let user = JSON.parse(localStorage.getItem('user') || '') as User;
    dispatch(logIn(user))
  }
  if (localStorage.getItem('productList') != null) {
    let list = JSON.parse(localStorage.getItem('productList') || '') as IstatePro;
    dispatch(getPurchaseList(list));
  }
  //  dispatch(increaseProductInList((rows.filter((item: ProductByMount) => item.idrow == id.toString()).at(0))));
  //  const rows = useSelector((Use:User) => Use.currentUser);
  return (
    <div className="App">

      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="" element={<Enter />} />
          <Route path="/homePage" element={<Enter />} />
          <Route path="/signUp" element={<Enter />} />
          <Route path="/logIn" element={<Enter/>} />
          <Route path="/allProducts" element={<CategoriesNavigation />} />
          <Route path="/allCategory" element={<CategoriesNavigation />} />
          <Route path="/previousPurchases" element={<PreviosPurchases />} />
          <Route path="/purchaseList" element={<PurchaseList />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/purchaselistToSave" element={<PurchaselistToSave />} />
          <Route path="/previousPurchases/orderDetails" element={<OrderDetails />} />
        </Routes>
      </Router>

    </div >
  );
}

export default App;
