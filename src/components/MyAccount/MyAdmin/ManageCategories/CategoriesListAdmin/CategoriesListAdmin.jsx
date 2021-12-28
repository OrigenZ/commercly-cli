import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";

import ReactPaginate from "react-paginate";

import axiosInstance from "../../../../../common/http/index";
import "./CategoriesListAdmin.css";

function CategoriesListAdmin(props) {
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
      const response = await axiosInstance.get(`/api/categories`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      let data;
      let postData;

      if (reset) {
        data = response.data;
      } else if (results) {
        data = results;
      } else {
        data = response.data;
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

        postData = slice.map((category) => (
          <Row key={category._id} className="category-row">
            <Col xs={12} sm={4} lg={2} >
              <p>{category.name}</p>
            </Col>
            <Col xs={12} sm={8} lg={8} >
              <p>{category.description}</p>
            </Col>

            <Col xs={12} sm={12} lg={2}>
              <Row>
                <Col xs={6} sm={6} lg={6} className="actions-btn">
                  <Col >
                    <Link
                      to={`/my-account/admin/category/edit/${category._id}`}
                      className="btn btn-outline-secondary edit-btn w-100"
                    >
                      Edit
                    </Link>
                  </Col>
                </Col>
                <Col xs={6} sm={6} lg={6} className="actions-btn">
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(category._id, category.name)}
                    className="delete-btn w-100"
                  >
                    Delete
                  </Button>
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
    <Col id="categories-list-admin" xs={12}>
      <Row id="head-categories-list">
        <Col xs={12} lg={2} >
          <p>Name</p>
        </Col>
        <Col xs={12} lg={8} className="text-lg-center">
          <p>Description</p>
        </Col>
        <Col xs={12} lg={2} className="text-lg-center" />
      </Row>

      {!data.length ? (
        <Row className="text-center p-5">
          <p>No categories found</p>
        </Row>
      ) : (
        <Col xs={12}>
          {data}
        </Col>
      )}

      <Row className="pagination">
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
      </Row>
    </Col>

  );
}

export default CategoriesListAdmin;


