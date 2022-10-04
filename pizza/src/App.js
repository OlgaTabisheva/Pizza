import React from "react";
import './scss/app.scss'
import Header from "./components/Header";
import NotFound from "../src/components/NotFoundBlock/index";


function App() {

  return (
    <div className="wrapper">
    <Header/>
      <div className="content">
        <div className="container">
         <NotFound/>
        </div>
      </div>
    </div>
  );
}

export default App;
