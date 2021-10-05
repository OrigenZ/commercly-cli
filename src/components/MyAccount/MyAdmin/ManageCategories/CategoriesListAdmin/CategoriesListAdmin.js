import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2/src/sweetalert2'

import axiosInstance from '../../../../../common/http/index'
import './CategoriesListAdmin.css'

function CategoriesListAdmin(props) {
  const [categories, setCategories] = useState([])

  const storedToken = localStorage.getItem('authToken')
  let history = useHistory()

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            text: `Category ${name} has been deleted.`,
            showConfirmButton: false,
          })

          axiosInstance
            .delete(`/api/categories/${id}`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
              const newCategories = categories.filter(
                (category) => category._id !== id,
              )
              setCategories([...newCategories])
              history.push('/my-account/admin/categories')
            })
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      })
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')

    // If the token exists in the localStorage
    if (storedToken) {
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
        })
        .catch((err) => {})
    }
  }, [])

  return (
    <>
      <Row>
        <Link
          to={`/admin/category/create`}
          className="btn btn-outline-dark col-12"
        >
          Add Category
        </Link>
      </Row>
      {categories.map((category) => (
        <Row key={category._id} id="categories-list">
          <Col xs={12} sm={4} lg={2}>
            <h3>{category.name}</h3>
          </Col>
          <Col xs={12} sm={8} lg={8}>
            <p>{category.description}</p>
          </Col>
          <Col xs={12} sm={12} lg={2}>
            <Row>
              <Col xs={6} sm={6} lg={6}>
                <div className="mb-2">
                  <Link
                    to={`/admin/category/edit/${category._id}`} //TODO  pasar a App.js
                    className="btn btn-outline-secondary edit-btn w-100"
                  >
                    Edit
                  </Link>
                </div>
              </Col>
              <Col xs={6} sm={6} lg={6}>
                <div className="mb-0">
                  <div
                    onClick={() => handleDelete(category._id, category.name)}
                    className="btn btn-outline-danger delete-btn w-100"
                  >
                    Delete
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default CategoriesListAdmin
