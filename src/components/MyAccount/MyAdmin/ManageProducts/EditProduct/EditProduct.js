import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axiosInstance from '../../../../../common/http/index'
import Swal from 'sweetalert2/src/sweetalert2'
// import TextEditor from '../TextEditor/TextEditor'
import ReactMde from 'react-mde'

import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import './EditProduct.css'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const EditProduct = (props) => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [value, setValue] = React.useState('')

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

  useEffect(() => {
    setField('description', value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const findFormErrors = () => {
    const { sku, quantity, name, price, brand, tax, category } = form
    const newErrors = {}

    // sku errors
    if (!sku || sku === '') newErrors.sku = 'This field cannot be blank.'

    // name errors
    if (!name || name === '') newErrors.name = 'This field cannot be blank.'
    else if (name.length < 3)
      newErrors.name = 'Title cannot be less than 3 characters long.'
    else if (name.length > 70)
      newErrors.name = 'Title cannot be more than 70 characters long.'

    // price errors
    if (!price || price === '') newErrors.price = 'This field cannot be blank.'
    else if (price < 0) newErrors.price = 'Price cannot be less than 0.'

    // quantity errors
    if (!quantity || quantity === '')
      newErrors.quantity = 'This field cannot be blank.'
    else if (quantity < 0)
      newErrors.quantity = 'Quantity cannot be less than 0.'

    // tax errors
    if (!tax || tax === '') newErrors.tax = 'This field cannot be blank.'
    else if (tax < 0) newErrors.tax = 'Tax cannot be less than 0.'

    // brand errors
    if (!brand || brand === '') newErrors.brand = 'This field cannot be blank.'
    else if (brand.length < 2)
      newErrors.brand = 'Brand cannot be less than 2 characters long.'
    else if (brand.length > 20)
      newErrors.brand = 'Brand cannot be more than 20 characters long.'

    // category
    if (!category || category === '')
      newErrors.category = 'This field cannot be blank!'

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      console.log('description', form.description)
      const body = { ...form }

      axiosInstance
        .patch(`/api/products/${id}`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          e.target.reset()
          Swal.fire({
            icon: 'success',
            text: 'Product edited successfully',
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
      //TODO: Set proper error handling
    }
  }

  useEffect(() => {
    try {
      axiosInstance
        .get(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const foundProduct = response.data
          setForm({
            sku: foundProduct.sku,
            quantity: foundProduct.quantity,
            name: foundProduct.name,
            price: foundProduct.price,
            tax: foundProduct.tax,
            brand: foundProduct.brand,
            description: foundProduct.description,
            category: foundProduct.category._id,
            image: foundProduct.image,
          })
        })

      axiosInstance
        .get('/api/categories', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
        })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className="container d-flex flex-column justify-content-center align-items-center"
      id="edit-product"
    >
      <div className="edit-product-wrapper">
        <h3 className="text-center text-muted text-uppercase">Edit product</h3>

        <div className="edit-product-container">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('sku', e.target.value)}
                  value={form.sku || ''}
                  isInvalid={!!errors.sku}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sku}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setField('quantity', e.target.value)}
                  isInvalid={!!errors.quantity}
                  value={form.quantity || ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Tax</Form.Label>
                <Form.Control
                  step="any"
                  type="number"
                  onChange={(e) => setField('tax', e.target.value)}
                  isInvalid={!!errors.tax}
                  value={form.tax || ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tax}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  step="any"
                  type="number"
                  onChange={(e) => setField('price', e.target.value)}
                  isInvalid={!!errors.price}
                  value={form.price || ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('name', e.target.value)}
                  isInvalid={!!errors.name}
                  value={form.name || ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3"></Row>

            <Row className="mb-3"></Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('brand', e.target.value)}
                  isInvalid={!!errors.brand}
                  value={form.brand || ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.brand}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3" id="text-editor">
              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <ReactMde
                  value={form.description || ''}
                  onChange={setValue}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                  childProps={{
                    writeButton: {
                      tabIndex: -1,
                    },
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  onChange={(e) => setField('category', e.target.value)}
                  isInvalid={!!errors.category}
                  value={form.category || ''}
                >
                  {categories.map((category) => {
                    return category._id === form.category ? (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ) : (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    )
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setField('image', e.target.files[0])}
                  value={form.image || ''}
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
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

export default EditProduct
