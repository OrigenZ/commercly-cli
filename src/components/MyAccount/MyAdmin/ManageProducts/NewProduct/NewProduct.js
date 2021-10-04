import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axiosInstance from '../../../../../common/http'

const NewProduct = () => {
  const [sku, setSku] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  // const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([])

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = new FormData()
    const storedToken = localStorage.getItem('authToken')

    body.append('sku', sku)
    body.append('quantity', quantity)
    body.append('name', name)
    body.append('price', price)
    body.append('brand', brand)
    body.append('description', description)
    body.append('category', category)
    body.append('imageUrl', image)

    axiosInstance
      .post(`/api/products/create`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        e.target.reset()
        history.push('/shop')
      })
      .catch((err) => {
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      })
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')

    const getCategories = () => {
      axiosInstance
        .get('/api/categories', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
          setCategory(response.data[0]._id)
        })
        .catch((err) => {})
    }
    getCategories()
  }, [])

  return (
    <section
      className="container d-flex flex-column justify-content-center align-items-center"
      id="create-product"
    >
      <div className="create-product-wrapper">
        <h2 className="text-center text-muted text-uppercase">New product</h2>

        <div className="create-product-container">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setSku(e.target.value)}
                  value={sku}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Title</Form.Label>
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
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
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
    </section>
  )
}

export default NewProduct
