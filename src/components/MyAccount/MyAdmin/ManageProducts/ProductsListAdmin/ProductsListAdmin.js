import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ReactPaginate from "react-paginate";
import './ProductsListAdmin.css'

import axiosInstance from "../../../../../common/http/index";

function ProductsListAdmin(props) {
  const { handleDelete, results } = props;
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

      const data = results.length ? results : response.data.products;
      const slice = data.slice(offset, offset + perPage);

      const postData = slice.map((product) => (
        <Row key={product._id} id="products-list">
          <Col xs={12} sm={4} lg={3}>
            <p>{product.sku}</p>
          </Col>
          <Col xs={6} sm={8} lg={2}>
            <p>{product.name}</p>
          </Col>
          <Col xs={6} sm={8} lg={2}>
            <p>{product.category.name}</p>
          </Col>
          <Col xs={6} sm={8} lg={1}>
            <p>{product.quantity}</p>
          </Col>
          <Col xs={6} sm={8} lg={1}>
            <p>{product.price}</p>
          </Col>

          <Col xs={12} sm={12} lg={3}>
            <Row>
              <Col xs={6} sm={6} lg={6}>
                <div className="mb-2">
                  <Link
                    to={`/admin/product/edit/${product._id}`}
                    className="btn btn-outline-secondary edit-btn w-100"
                  >
                    Edit
                  </Link>
                </div>
              </Col>
              <Col xs={6} sm={6} lg={6}>
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
      {data}
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
        activeClassName={"active"}
      />
    </>
  );
}

export default ProductsListAdmin;