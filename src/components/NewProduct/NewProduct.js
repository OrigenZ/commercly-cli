import React, { useState } from "react";
import axiosInstance from "../../common/http/index";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, price, brand, description, category, image);

    const storedToken = localStorage.getItem("authToken");
    const body = { name, price, brand, description, category, image };

    axiosInstance
      .post(`/api/products/create`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response created product", response);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <section
        className="container d-flex flex-column justify-content-center align-items-center"
        id="create-product"
      >
        <div className="create-product-wrapper">
          <h2 className="text-center text-muted text-uppercase">New product</h2>

          <div className="create-product-container">
            <form
              // method="post"
              // action="/products/create"
              // enctype="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="d-flex flex-column">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  step="any"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="brand">Brand:</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  onChange={(e) => setBrand(e.target.value)}
                />

                <label htmlFor="">Description:</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="{{id}}">name </option>
                </select>

                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-outline-secondary py-2 px-5 mt-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProduct;
