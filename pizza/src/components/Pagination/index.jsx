import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import Cart from "../../pages/Cart";


export const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected+1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
      //forcePage={currentPage - 1}
    />
  )

}