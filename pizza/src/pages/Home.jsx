import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizza from "../components/SkeletonPizza";
import PizzaBlock from "../components/PizzaBlock";
import React, {useEffect, useState} from "react";



export const Home =()=>{
  const [items,setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    fetch('https://633b271b471b8c39557d8047.mockapi.io/Item')
      .then((res)=> {
        return res.json();
      })
      .then((arr)=>{
        setItems(arr)
        setIsLoading(false)
      })
  },[])
  return(
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [new Array(6)].map((_, index)=><SkeletonPizza key={index}/>)
          : items.map((obj) =>(
            <PizzaBlock key={obj.id} title={obj.title} price = {obj.price} imageUrl={obj.imageUrl} sizes={obj.sizes} types={obj.types}/>
          ))
        }

      </div>
    </>
  )
}