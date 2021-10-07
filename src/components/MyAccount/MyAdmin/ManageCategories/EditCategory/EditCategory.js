// import { AuthContext } from "../../../common/context/Auth.context";
import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../../../common/http'
import Swal from 'sweetalert2/src/sweetalert2'

import './EditCategory.css'

const EditCategory = (props) => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const { id } = props.match.params
  const storedToken = localStorage.getItem('authToken')

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      })
  }

  const findFormErrors = () => {
    const { name } = form
    const newErrors = {}

    // name errors
    if (!name || name === '') newErrors.name = 'This field cannot be blank.'
    else if (name.length < 3)
      newErrors.name = 'Name cannot be less than 3 characters long.'
    else if (name.length > 50)
      newErrors.name = 'Name cannot be more than 50 characters long.'

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      const body = { ...form }

      axiosInstance
        .patch(`/api/categories/${id}`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          e.target.reset()
          Swal.fire({
            icon: 'success',
            text: 'Category edited successfully',
            showConfirmButton: false,
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        })
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')

    axiosInstance
      .get(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const foundCategory = response.data
        setForm({
          name: foundCategory.name,
          description: foundCategory.description,
        })
      })
      .catch((error) => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className="container d-flex flex-column justify-content-center align-items-center"
      id="edit-category"
    >
      <div className="edit-category-wrapper">
        <h2 className="text-center text-muted text-uppercase">
          Edit category
        </h2>

        <div className="edit-category-container">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setField('name', e.target.value)}
              value={form.name || ''}
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
              onChange={(e) => setField('description', e.target.value)}
              value={form.description || ''}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button variant="success" type="submit">
          Submit changes
        </Button>
      </Form>
      </div>
      </div>
    </section>
  )
}

export default EditCategory
