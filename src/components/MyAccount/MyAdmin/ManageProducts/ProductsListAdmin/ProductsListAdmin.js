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
import defaultImage from "../../../../../images/img-default.jpg";
import './ProductsListAdmin.css'

function ProductsListAdmin(props) {
  const [products, setProducts] = useState([]);
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
          Swal.fire("Deleted!", `Product ${name} has been deleted.`, "success");

          axiosInstance
            .delete(`/api/products/${id}`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
              const newProducts = products.filter(
                (product) => product._id !== id
              );
              setProducts([...newProducts]);
              history.push("/my-account/admin/products");
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
        .get(`/api/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log("Category of proddss", response.data.products[0].category);
          const newData = response.data.products.map((product) => [
            product.sku,
            product.name,
            product.quantity,
            product.category.name,
            product.brand,
            product.price,
            _(
              <div>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    history.push(`/admin/product/edit/${product._id}`)
                  }
                  className="btn btn-outline-secondary edit-btn w-100"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(product._id, product.name)}>
                  Delete
                </Button>
              </div>
            ),
          ]);

          new Grid({
            columns: [
              "SKU",
              "Name",
              "Quantity",
              "Category",
              "Brand" ,
              "Price" ,
              { name:"Actions" , sort: false,},
            ],
            pagination: true,
            sort: true,
            search: {
              selector: (cell, rowIndex, cellIndex) => cell,
            },
            data: [...newData],
          }).render(wrapperRef.current);

          setProducts(response.data);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <>
      <Link
        to={`/admin/product/create`}
        className="btn btn-outline-dark col-12"
      >
        Add Product
      </Link>

      <div ref={wrapperRef} />
    </>
  );
}

export default ProductsListAdmin;
