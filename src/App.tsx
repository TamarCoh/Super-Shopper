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
import PreviosPurchases from './Components/PreviousPurchases';
import { useDispatch, useSelector } from 'react-redux';
import { User } from './utils/modals';

function App() {
const dispatch =useDispatch ();
//  dispatch(increaseProductInList((rows.filter((item: ProductByMount) => item.idrow == id.toString()).at(0))));
//  const rows = useSelector((Use:User) => Use.currentUser);
  return (
    <div className="App">

      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Enter open={false} />} />
          <Route path="" element={<Enter open={false} />} />
          <Route path="/homePage" element={<Enter open={false} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<Enter open={true} />} />
          <Route path="/allProducts" element={<CategoriesNavigation />} />
          <Route path="/allCategory" element={<CategoriesNavigation />} />
          <Route path="/PreviousPurchases" element={<PreviosPurchases />} />
          <Route path="/purchaseList" element={<PurchaseList />} />
          {/* <Route path="/fullFeaturedCrudGrid" element={<FullFeaturedCrudGrid />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
