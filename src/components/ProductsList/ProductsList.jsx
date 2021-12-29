import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Col, Row } from "react-bootstrap";

import ReactPaginate from "react-paginate";
import "./ProductsList.css";

const ProductsList = (props) => {
  const { handleDelete, results, products, isShop, reset } = props;

  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(null)

  const handlePageClick = ({ selected }) => {
    setPage(selected)
    setOffset(Math.ceil(selected * perPage));
  };

  const getData = () => {
    if (!reset) {
      setPageCount(Math.ceil(results.length / perPage));
      return results.slice(offset, offset + perPage);
    }
    setPageCount(Math.ceil(products.length / perPage));
    return products.slice(offset, offset + perPage);
  };

  useEffect(() => {
    setData(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, results, reset, products]);

  useEffect(() => {
    setOffset(0)
    setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);


  return (
    <>
      <Row >
        {data.map((product) => {
          return <ProductCard
            key={product._id}
            product={product}
            handleDelete={handleDelete}
            isShop={isShop} //TODO: check this later
          />
        })}

        {!data.length && <Col xs={12} className="text-center p-5">No matching products found</Col>}
      </Row>

      <Row className="pagination">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeclassname={"active"}
          renderOnZeroPageCount={null}
          forcePage={page}
        />
      </Row>
    </>
  );
};



export default ProductsList;
