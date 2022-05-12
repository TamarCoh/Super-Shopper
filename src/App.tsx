import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogIn from './Components/LogIn';
import { PurchaseList } from './Components/PurchaseList';
import { lookup } from 'dns';
import SignUp from './Components/SignUp';
import Enter from './Components/Enter';
import Logo from './Components/Logo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Components/Nav';
import CategoriesNavigation from './Components/AllCategory';
import AllCategory from "./Components/AllCategory";
import { AllProducts } from './Components/AllProducts';


function App() {

  return (
    <div className="App">

      <Router>
        <Nav />
        <Routes>

          <Route path="/" element={<Enter />} />
          <Route path="" element={<Enter />} />
          <Route path="/homePage" element={<Enter />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/allCategory" element={<CategoriesNavigation />} />
          <Route path="/purchaseList" element={<PurchaseList />} />
          {/* <Route path="/fullFeaturedCrudGrid" element={<FullFeaturedCrudGrid />} /> */}

        </Routes>
      </Router>

    </div>
  );
}

export default App;
