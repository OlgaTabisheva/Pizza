import React from "react";
import qs from 'qs'
import {useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import SkeletonPizza from "../components/SkeletonPizza";
import PizzaBlock from "../components/PizzaBlock";
import {FilterSliceState, selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slises/filterSlise";
import Pagination from "../components/Pagination/index";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slises/pizzaSlice";
import {useAppDispatch} from "../redux/store";


 const Home:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onClickCategory = (id:number) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number))
  }
  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0)
  }


/*
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    //isMounted.current = true;
      if(!window.location.search){
          dispatch(fetchPizzas({} as SearchPizzaParams))
      }
  }, [categoryId, sort.sortProperty, currentPage]);

*/


/*  React.useEffect(() => {
    if (window.location.search) {
      const params= qs.parse(window.location.search.substring(1))as unknown as SearchPizzaParams ;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
        dispatch(setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sort: sort || list[0]
        }))
      isSearch.current = true;
    }
  }, [])*/


  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage])


/*
 const pizzas = items.filter((obj:any) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  })

    items.map((obj:any) => (
      <PizzaBlock {...obj}/>
    ))
*/
  const pizzas = items.map((obj: any) => (<PizzaBlock key={obj.id} {...obj} />));

  const skeletons = [new Array(6)].map((_, index) => <SkeletonPizza key={index}/>)
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory}/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (
          <div className='content__error-info'>
            <h2>
              Произвошла ошибка <span>😕</span>
            </h2>
            <p>
              Не удалось получить пиццы.
              <br/>
              Попробуйте повторить попытку позже
            </p>
          </div>
        ) : (<div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>)
      }

      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  )
}
export default Home