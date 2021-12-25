import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Col } from "react-bootstrap";

import ReactPaginate from "react-paginate";
import axiosInstance from "../../common/http";
import "./ProductsList.css";

const ProductsList = (props) => {
  const { handleDelete, results, isShop, reset } = props;

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);


  const storedToken = localStorage.getItem('authToken')

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
  };

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/api/products`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const products = response.data.products;

      const sliceAllProds = products.slice(offset, offset + perPage);
      const sliceResults = results.slice(offset, offset + perPage);

      let postData;

      if (reset || !results) {
        postData = sliceAllProds.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleDelete={handleDelete}
            isShop={isShop}
          />
        ));

        setPageCount(Math.ceil(products.length / perPage));
      }

      if (!reset) {
        postData = sliceResults.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleDelete={handleDelete}
            isShop={isShop}
          />
        ));
        setPageCount(Math.ceil(results.length / perPage));
      }

      if(!reset && results.length === 0){
        postData =  <Col xs={12} className="text-center">No matching products found</Col> 
      }


      setData(postData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, handleDelete]);

  return (
    <>
      <div className="row">
      {data}
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeclassname={"active"}
        />
      </div>
    </>
  );
};

export default ProductsList;
