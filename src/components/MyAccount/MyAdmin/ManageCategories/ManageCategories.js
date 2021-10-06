import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axiosInstance from '../../../../common/http'

import Swal from 'sweetalert2/src/sweetalert2'

import CategoriesListAdmin from './CategoriesListAdmin/CategoriesListAdmin'
import AddCategoryButton from './NewCategory/AddCategoryButton/AddCategoryButton'
import SearchBar from '../../../SearchBar/SearchBar'

const ManageCategories = () => {
  const [categories, setCategories] = useState([])
  const [currentSearch, setCurrentSearch] = useState('')
  const [results, setResults] = useState([])
  const [reset, setReset] = useState(true)

  const storedToken = localStorage.getItem('authToken')

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
            })
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        console.log(err.message)
      })
  }

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [])

  useEffect(() => {
    const categoriesFound = categories.filter((category) => {
      const regex = new RegExp(currentSearch, 'i')
      return category.name.match(regex)
    })
    setResults(categoriesFound)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch])

  return (
    <div className="section col-12">
      <AddCategoryButton />

      <Button
        variant="outline-danger"
        className="reset"
        onClick={() => {
          setReset(true)
          setResults([])
          setCurrentSearch('')
        }}
      >
        Reset Filter
      </Button>

      <SearchBar setCurrentSearch={setCurrentSearch} setReset={setReset} />

      <CategoriesListAdmin
        results={results}
        handleDelete={handleDelete}
        categories={categories}
        setCategories={setCategories}
        reset={reset}
      />
    </div>
  )
}

export default ManageCategories
