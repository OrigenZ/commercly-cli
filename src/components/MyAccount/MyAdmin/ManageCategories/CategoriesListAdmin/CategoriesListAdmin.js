import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2/src/sweetalert2";
import { Grid, html } from "gridjs";
import { _ } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";

import axiosInstance from "../../../../../common/http/index";
import "./CategoriesListAdmin.css";

function CategoriesListAdmin(props) {
  const [categories, setCategories] = useState([]);
  const wrapperRef = useRef(null);

  const storedToken = localStorage.getItem("authToken");
  let history = useHistory();

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
              history.push("/my-account/admin/categories");
            });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
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
          const newData = response.data.map((category) => [
            category.name,
            category.description,
            _(
              <div>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    history.push(`/admin/category/edit/${category._id}`)
                  }
                  className="btn btn-outline-secondary edit-btn w-100"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(category._id, category.name)}
                >
                  Delete
                </Button>
              </div>
            ),
          ]);

          new Grid({
            columns: [
              "Name",
              { name: "Description", sort: false },
              { name: "Actions", sort: false },
            ],
            pagination: true,
            sort: true,
            search: {
              selector: (cell, rowIndex, cellIndex) =>  cell
            },
            data: [...newData],
          }).render(wrapperRef.current);

          setCategories(response.data);
        })
        .catch((err) => {});
    }
  }, []);

  return (
  <>
        <Link
          to={`/admin/category/create`}
          className="btn btn-outline-dark col-12"
        >
          Add Category
        </Link>

        <div ref={wrapperRef} />
  </>
  );
}

export default CategoriesListAdmin;
