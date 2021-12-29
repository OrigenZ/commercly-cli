import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axiosInstance from '../../../../common/http'

import Swal from 'sweetalert2/src/sweetalert2'

import CategoriesListAdmin from './CategoriesListAdmin/CategoriesListAdmin'
import AddCategoryButton from './NewCategory/AddCategoryButton/AddCategoryButton'
import SearchBar from '../../../SearchBar/SearchBar'

import './ManageCategories.css'

const ManageCategories = () => {
  const [categories, setCategories] = useState([])
  const [currentSearch, setCurrentSearch] = useState('')
  const [results, setResults] = useState([])
  const [reset, setReset] = useState(true)

  const storedToken = localStorage.getItem('authToken')

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(`/api/categories`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      setCategories(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async (id, name) => {
    try {
      const input = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
      })

      if (input.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: `Category ${name} has been deleted.`,
          showConfirmButton: false,
        })
        await axiosInstance
          .delete(`/api/categories/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        const newCategories = categories.filter((category) => category._id !== id)
        setCategories([...newCategories])
      }
    }
    catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (currentSearch) {
      const categoriesFound = categories.filter((category) => {
        const regex = new RegExp(currentSearch, 'i')
        return category.name.match(regex)
      })
      setResults(categoriesFound)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch])

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Row id="manage-categories">
        <Col xs={12} className="filter-container">
          <SearchBar setCurrentSearch={setCurrentSearch} setReset={setReset} />
          <AddCategoryButton />
        </Col>

        <CategoriesListAdmin
          results={results}
          categories={categories}
          handleDelete={handleDelete}
          setCategories={setCategories}
          reset={reset}
          setReset={setReset}
        />
      </Row>
    </Container>
  )
}
export default ManageCategories
