import React from "react";
import './scss/app.scss'
import {Route, Routes,} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import Header from "./components/Header";
import NotFound from "../src/components/NotFoundBlock/index";
import {Home} from "./pages/Home";
import Cart from "./pages/Cart"



function App() {

  return (
    <div className="wrapper">
        <Header/>
        <div className="content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
