import React, { useEffect, useState } from "react";

import ProductsList from "../ProductsList/ProductsList";
import SearchBar from "../SearchBar/SearchBar";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import Swal from 'sweetalert2/src/sweetalert2'
import axiosInstance from "../../common/http";

import "./Shop.css";
import { Container, Row, Col } from "react-bootstrap";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [reset, setReset] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', `Product ${name} has been deleted.`, 'success')

        axiosInstance
          .delete(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then(() => {
            const newProducts = products.filter((product) => product._id !== id)
            setProducts(newProducts)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  useEffect(() => {
    if (currentCategory) {
      const filteredByCategory = products.filter((product) => {
        return product.category._id === currentCategory;
      });
      setResults(filteredByCategory);
      setCurrentSearch("");
    }

    if (currentSearch) {
      const productsFound = products.filter((product) => {
        const regex = new RegExp(currentSearch, "i");
        const nameFound = product.name.match(regex);
        const brandFound = product.brand.match(regex);

        return nameFound || brandFound;
      });

      setResults(productsFound);
      setCurrentCategory("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentSearch]);

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/products`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) => {
          console.log(err.message)
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
    <div className="row pt-5 ">
      <div className="col-12 col-md-3">

  

        <SearchBar 
          setCurrentSearch={setCurrentSearch} 
          setReset={setReset}
        />

        <CategoriesFilter
          setCurrentCategory={setCurrentCategory}
          setReset={setReset}
        />
   
      </div>
      
      <div className="col-12 col-md-9">
        <ProductsList
          results={results}
          handleDelete={handleDelete}
          isShop={true}
          reset={reset}
        />
      </div>
    </div>
    </div>
  );
};

export default Shop;
