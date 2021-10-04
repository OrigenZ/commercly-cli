import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axiosInstance from "../../../../../common/http/index";

import "./CategoriesListAdmin.css";

const CategoriesListAdmin = (props) => {
  const [categories, setCategories] = useState([]);
  // const [setErrorMessage] = useState(undefined)

  const storedToken = localStorage.getItem("authToken");

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const newCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories([...newCategories]);
        props.history.push('/my-account/admin/categories') 
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <>
      <Row>
        <Link
          to={`/admin/category/create`}
          className="btn btn-outline-dark col-12"
        >
          Add Category
        </Link>
      </Row>
      {categories.map((category) => (
        <Row key={category._id} id="categories-list">
          <Col xs={12} sm={4} lg={2}>
            <h3>{category.name}</h3>
          </Col>
          <Col xs={12} sm={8} lg={8}>
            <p>{category.description}</p>
          </Col>
          <Col xs={12} sm={12} lg={2}>
            <Row>
              <Col xs={6} sm={6} lg={6}>
                <div className="mb-2">
                  <Link
                    to={`/admin/category/edit/${category._id}`} //TODO  pasar a App.js
                    className="btn btn-outline-secondary edit-btn w-100"
                  >
                    Edit
                  </Link>
                </div>
              </Col>
              <Col xs={6} sm={6} lg={6}>
                <div className="mb-0">
                  <div
                    onClick={() => handleDelete(category._id)}
                    className="btn btn-outline-danger delete-btn w-100"
                  >
                    Delete
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default CategoriesListAdmin;
