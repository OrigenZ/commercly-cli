// import { AuthContext } from "../../../common/context/Auth.context";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Swal from 'sweetalert2/src/sweetalert2'

import axiosInstance from '../../../../../common/http'

import './EditCategory.css'

const EditCategory = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const { id } = useParams()
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

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      const foundCategory = response.data
      setForm({
        name: foundCategory.name,
        description: foundCategory.description,
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const body = { ...form }
    try {
      await axiosInstance.patch(`/api/categories/${id}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      e.target.reset()
      Swal.fire({
        icon: 'success',
        text: 'Category edited successfully',
        showConfirmButton: false,
      })

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className="d-flex justify-content-center align-items-center container"
      id="edit-category"
    >
      <Col sm={12} md={9} lg={7} xl={6} className="edit-category-wrapper">
        <h3 className="text-center text-muted text-uppercase">Edit category</h3>

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

            <Button variant="outline-success" type="submit">
              Submit changes
            </Button>
          </Form>
        </div>
      </Col>
    </section>
  )
}

export default EditCategory
