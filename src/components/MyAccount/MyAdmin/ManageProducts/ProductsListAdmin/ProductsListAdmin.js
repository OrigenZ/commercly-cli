import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ReactPaginate from "react-paginate";
import "./ProductsListAdmin.css";

import axiosInstance from "../../../../../common/http/index";

function ProductsListAdmin(props) {
  const { handleDelete, results, reset } = props;
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const storedToken = localStorage.getItem("authToken");

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
  };
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/api/products`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      let data;
      let postData;

      if (reset) {
        data = response.data.products;
      } else if (results) {
        data = results;
      } else {
        data = response.data.products;
      }
      //TODO: optimizar

      if (results && results.length === 0) {
        postData = (
          <Col xs={12} className="text-center">
            No matching products found
          </Col>
        );
      } else {
        const slice = data.slice(offset, offset + perPage);

        postData = slice.map((product) => (
          <Row key={product._id} id="products-list">
            <Col xs={12} sm={4} lg={2}>
              <p>{product.sku}</p>
            </Col>
            <Col xs={6} sm={8} lg={2}>
              <p>{product.name}</p>
            </Col>
            <Col xs={6} sm={8} lg={2}>
              <p>{product.category.name}</p>
            </Col>
            <Col xs={6} sm={8} lg={2}>
              <p>{product.quantity}</p>
            </Col>
            <Col xs={6} sm={8} lg={2}>
              <p>{product.totalPrice} €</p>
            </Col>

            <Col xs={12} sm={12} lg={2}>
              <Row>
                <Col xs={6} sm={6} lg={6} className="buttons">
                  <div className="mb-2">
                    <Link
                      to={`/admin/product/edit/${product._id}`}
                      className="btn btn-outline-secondary edit-btn w-100"
                    >
                      Edit
                    </Link>
                  </div>
                </Col>
                <Col xs={6} sm={6} lg={6} className="buttons">
                  <div className="mb-0">
                    <div
                      onClick={() => handleDelete(product._id, product.name)}
                      className="btn btn-outline-danger delete-btn w-100"
                    >
                      Delete
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ));
      }

      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, handleDelete]);

  return (
    <>
      <div className="row">
        <Row id="head-products-list">
          <Col xs={12} sm={4} lg={2}>
            <p>SKU</p>
          </Col>
          <Col xs={6} sm={8} lg={2}>
            <p>Name</p>
          </Col>
          <Col xs={6} sm={8} lg={2}>
            <p>Category</p>
          </Col>
          <Col xs={6} sm={8} lg={2}>
            <p>Quantity</p>
          </Col>
          <Col xs={6} sm={8} lg={2}>
            <p>Price</p>
          </Col>

          <Col xs={12} sm={12} lg={2}>
            <p>Actions</p>
          </Col>
        </Row>
        {data}
      </div>
      <div className="shop-pagination">
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
}

export default ProductsListAdmin;
