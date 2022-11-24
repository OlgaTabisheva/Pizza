import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizza from "../components/SkeletonPizza";
import PizzaBlock from "../components/PizzaBlock";
import React, {useEffect, useState} from "react";
import {Pagination} from "../components/Pagination";



export const Home =({searchValue, setSearchValue})=>{
  const [items,setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [categoryId,setCategoryId] =useState(0)
  const [currentPage, setCurrentPage]=useState(1)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  useEffect(()=>{

    setIsLoading(true)
    const  order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy =sortType.sortProperty.replace('-','')
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${setSearchValue}` : '';
    console.log(      `https://633b271b471b8c39557d8047.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      ,categoryId)

    fetch(
      `https://633b271b471b8c39557d8047.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res)=> {
        return res.json();
      })
      .then((arr)=>{
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0,0)
  },[categoryId, sortType, searchValue,currentPage])
  const pizzas =  items.filter(obj=>{
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
    })
    .map((obj) =>(
    <PizzaBlock key={obj.id} {... obj}/>
  ))
  const skeletons=[new Array(6)].map((_, index)=><SkeletonPizza key={index}/>)
  return(
    <>
      <div className="content__top">
        <Categories value = {categoryId} onClickCategory={(id)=>setCategoryId(id)}/>
        <Sort value = {sortType} onChangeSort={(id)=>setSortType(id)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
    </>
  )
}