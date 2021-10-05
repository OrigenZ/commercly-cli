// import { AuthContext } from "../../../common/context/Auth.context";
import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../../../common/http'

const EditCategory = (props) => {
  // const {product, setProduct}= useState([]);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const { id } = props.match.params

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
        props.history.push(`/my-account/admin/categories`)
      })
      .catch((error) => {})
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
      .catch((error) => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="section">
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
  )
}

export default EditCategory
