import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axiosInstance from "../../../../../common/http";
import Swal from "sweetalert2/src/sweetalert2";

import "./NewCategory.css";

const NewCategory = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const storedToken = localStorage.getItem("authToken");

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { name } = form;
    const newErrors = {};

    // name errors
    if (!name || name === "") newErrors.name = "This field cannot be blank.";
    else if (name.length < 3)
      newErrors.name = "Name cannot be less than 3 characters long.";
    else if (name.length > 50)
      newErrors.name = "Name cannot be more than 50 characters long.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const body = { ...form };

      axiosInstance
        .post(`/api/categories/create`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          e.target.reset();
          Swal.fire({
            icon: "success",
            text: "Category edited successfully",
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center container"
      id="create-category"
    >
      <Col xs={12} sm={6} lg={4} className="edit-category-wrapper">
        <h3 className="text-center text-muted text-uppercase">
          Create category
        </h3>

        <div className="create-category-container">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField("name", e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  onChange={(e) => setField("description", e.target.value)}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="outline-success" type="submit">
              Submit changes
            </Button>
          </Form>
        </div>
      </Col>
    </section>
  );
};

export default NewCategory;
