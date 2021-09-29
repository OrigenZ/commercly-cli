import React, { useState } from "react";
import axios from "../../common/http/index";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  return (
    <div>
      <section
        class="container d-flex flex-column justify-content-center align-items-center"
        id="create-product"
      >
        <div class="create-product-wrapper">
          <h2 class="text-center text-muted text-uppercase">New product</h2>

          <div class="create-product-container">
            <form
              method="post"
              action="/products/create"
              enctype="multipart/form-data"
            >
              <div class="d-flex flex-column">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label for="price">Price:</label>
                <input type="number" step="any" id="price" name="price" />

                <label for="brand">Brand:</label>
                <input type="text" id="brand" name="brand" />

                <label for="">Description:</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                ></textarea>

                <label for="category">Category:</label>
                <select name="category" id="category">
                  <option value="{{id}}">name </option>
                </select>

                <label for="image">Image:</label>
                <input type="file" name="image" id="image" />

                <button
                  type="submit"
                  class="btn btn-outline-secondary py-2 px-5 mt-4"
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
