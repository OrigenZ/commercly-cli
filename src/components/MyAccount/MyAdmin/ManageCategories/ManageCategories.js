import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../common/http";

import Swal from "sweetalert2/src/sweetalert2";

import CategoriesListAdmin from "./CategoriesListAdmin/CategoriesListAdmin";
import AddCategoryButton from "./NewCategory/AddCategoryButton/AddCategoryButton";
import SearchBar from "../../../SearchBar/SearchBar";

import "./ManageCategories.css";
import { Col, Container, Row } from "react-bootstrap";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [results, setResults] = useState(null);
  const [reset, setReset] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            text: `Category ${name} has been deleted.`,
            showConfirmButton: false,
          });

          axiosInstance
            .delete(`/api/categories/${id}`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
              const newCategories = categories.filter(
                (category) => category._id !== id
              );
              setCategories([...newCategories]);
            });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentSearch) {
      const categoriesFound = categories.filter((category) => {
        const regex = new RegExp(currentSearch, "i");
        return category.name.match(regex);
      });
      setResults(categoriesFound);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch]);

  return (
    <Container>
      <Row id="manage-cat" >
        <Col xs={12} className="search-add">
          <SearchBar setCurrentSearch={setCurrentSearch} setReset={setReset} />
          <AddCategoryButton />
        </Col>
        <Col xs={12} className="list">
          <CategoriesListAdmin
            results={results}
            handleDelete={handleDelete}
            categories={categories}
            setCategories={setCategories}
            reset={reset}
            setReset={setReset}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default ManageCategories;

