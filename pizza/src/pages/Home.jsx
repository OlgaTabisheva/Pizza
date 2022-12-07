import React, {useEffect, useState} from "react";
import axios from "axios";
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import SkeletonPizza from "../components/SkeletonPizza";
import PizzaBlock from "../components/PizzaBlock";
import { setCategoryId, setCurrentPage , setFilters} from "../redux/slises/filterSlise";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";

export const Home =()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted =React.useRef(false);

  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const {searchValue}=React.useContext(SearchContext)
  const [items,setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  const onClickCategory =(id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number =>{
    dispatch(setCurrentPage(number))
  }
 const fetchPizzas = () => {
   setIsLoading(true)
   const  order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
   const sortBy =sort.sortProperty.replace('-','')
   const category = categoryId > 0 ? `category=${categoryId}` : '';
   const search = searchValue  ? `search=${searchValue}` : '';

   axios
     .get(
       `https://633b271b471b8c39557d8047.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
     )
     .then((arr)=>{
       setItems(arr.data)
       setIsLoading(false)
     })
 }
  React.useEffect(()=>{
    if (isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  },[categoryId, sort.sortProperty,currentPage]);

  React.useEffect(()=>{
    if (window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      console.log(list)
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
      }),
      );
    isSearch.current = true;
    }
    console.log(list)
    console.log(sort)
  },[])

  React.useEffect(()=>{
    window.scrollTo(0,0);
   if (!isSearch.current){
     fetchPizzas();
   }
   isSearch.current = false;
  },[categoryId, sort.sortProperty, searchValue,currentPage])


  const pizzas =  items.filter(obj=>{
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
    })
    .map((obj) =>(
    <PizzaBlock key={obj.id} {... obj}/>
  ));
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  )
}