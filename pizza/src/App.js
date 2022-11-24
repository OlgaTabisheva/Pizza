import React from "react";
import './scss/app.scss'
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import NotFound from "../src/components/NotFoundBlock/index";
import {Home} from "./pages/Home";
import Cart from "./pages/Cart"
function App() {
const [searchValue,setSearchValue] = React.useState('')
  return (
    <div className="wrapper">
    <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue} />}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
