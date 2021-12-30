import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Swal from 'sweetalert2/src/sweetalert2'
import ReactQuill from 'react-quill'

import axiosInstance from '../../../../../common/http/index'

import 'react-quill/dist/quill.snow.css'
import './EditProduct.css'

const EditProduct = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])

  const storedToken = localStorage.getItem('authToken')
  const { id } = useParams()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const body = { ...form }
    try {
      await axiosInstance.patch(`/api/products/${id}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      Swal.fire({
        icon: 'success',
        text: 'Product edited successfully',
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

  const getData = async () => {
    try {
      const prodsResponse = await axiosInstance.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      const foundProduct = prodsResponse.data
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

      const catsResponse = await axiosInstance.get('/api/categories', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      setCategories(catsResponse.data)
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
      className="container d-flex flex-column justify-content-center align-items-center"
      id="edit-product"
    >
      <Col sm={12} md={9} lg={7} xl={6} className="edit-product-wrapper">
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

                <ReactQuill
                  theme={'snow'}
                  value={form.description}
                  onChange={(innerHTML) => {
                    if (form.description) setField('description', innerHTML)
                  }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ color: [] }], // dropdown with defaults from theme
                      [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                        { align: [] },
                      ],

                      ['link'],
                      ['clean'],
                    ],
                  }}
                  formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'indent',
                    'link',
                    'color',
                    'background',
                    'align',
                  ]}
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
                    return (
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
            <Button variant="outline-success" type="submit">
              Submit changes
            </Button>
          </Form>
        </div>
      </Col>
    </section>
  )
}

export default EditProduct
