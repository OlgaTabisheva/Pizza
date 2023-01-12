import * as React from "react";
import './scss/app.scss'
import {Route, Routes,} from "react-router-dom";
import NotFound from "./components/NotFoundBlock";
import Home from "./pages/Home";
import Cart from "./pages/Cart"
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayouts";


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>

    );
}

export default App;
