// import { AuthContext } from "../../../common/context/auth.context";
import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../../../common/http'

const EditCategory = (params) => {
  // const {product, setProduct}= useState([]);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // console.log(params.match.params);

  const { id } = params.match.params

  const storedToken = localStorage.getItem('authToken')

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = { name, description }

    axiosInstance
      .patch(`/api/categories/${id}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        e.target.reset()
        /* history.push("/shop"); */
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')

    axiosInstance
      .get(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const foundCategory = response.data
        setName(foundCategory.name || '')
        setDescription(foundCategory.description || '')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }, [])

  return (
    <div className="section">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default EditCategory
