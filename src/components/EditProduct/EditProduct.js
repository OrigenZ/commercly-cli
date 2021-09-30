// import { AuthContext } from "../../../common/context/auth.context";
import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
// import { useHistory } from "react-router-dom";
import axiosInstance from '../../common/http/index'

const EditProduct = (params) => {
  // const {product, setProduct}= useState([]);
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  // const [errorMessage, setErrorMessage] = useState('')
  const [categories, setCategories] = useState([])

  const { id } = params.match.params

  const storedToken = localStorage.getItem('authToken')

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = { name, price, brand, description, category, image }

    axiosInstance
      .patch(`/api/products/${id}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        e.target.reset()
        /* history.push("/shop"); */
      })
      .catch((error) => {})
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')

    axiosInstance
      .get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const foundProduct = response.data
        setName(foundProduct.name || '')
        setPrice(foundProduct.price || 0)
        setBrand(foundProduct.brand || '')
        setDescription(foundProduct.description || '')
        setCategory(foundProduct.category._id || '')
        setImage(foundProduct.image || '')
      })
      .catch((error) => {})

    axiosInstance
      .get('/api/categories', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
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

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {categories.map((cat) => {
                    return cat._id === category ? (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ) : (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.value)}
                  // value={image}
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

export default EditProduct
