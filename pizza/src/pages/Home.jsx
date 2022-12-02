import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizza from "../components/SkeletonPizza";
import PizzaBlock from "../components/PizzaBlock";
import { setCategoryId } from "../redux/slises/filterSlise";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";

export const Home =()=>{
  const dispatch = useDispatch()
  const {categoryId, sort} = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const {searchValue}=React.useContext(SearchContext)
  const [items,setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [currentPage, setCurrentPage]=useState(1)


  const onClickCategory =(id) => {
    dispatch(setCategoryId(id))
  }

  useEffect(()=>{

    setIsLoading(true)
    const  order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy =sortType.replace('-','')
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';
    console.log(`https://633b271b471b8c39557d8047.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      ,categoryId)

  /*  fetch(
      `https://633b271b471b8c39557d8047.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res)=> {
        return res.json();
      })
      .then((arr)=>{
        setItems(arr)
        setIsLoading(false)
      })*/

    axios
      .get(
        `https://633b271b471b8c39557d8047.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((arr)=>{
        setItems(arr.data)
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
        <Categories value = {categoryId} onClickCategory={onClickCategory}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
    </>
  )
}