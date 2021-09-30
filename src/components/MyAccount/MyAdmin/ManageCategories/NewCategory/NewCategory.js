import React, { useState } from "react";
import axiosInstance from "../../../../../common/http";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, description };
    const storedToken = localStorage.getItem("authToken");
    
    axiosInstance
      .post("/api/categories/create", body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        e.target.reset();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section
      className="container d-flex flex-column justify-content-center align-items-center"
      id="create-category"
    >
      <div className="create-category-wrapper">
        <h2 className="text-center text-muted text-uppercase">Create category</h2>

        <div className="create-category-container">
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="">Description:</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

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
  );
};

export default NewCategory;
