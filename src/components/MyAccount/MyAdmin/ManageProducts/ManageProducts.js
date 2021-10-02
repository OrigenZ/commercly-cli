import React, { useEffect, useState } from 'react'

import CategoriesFilter from '../../../CategoriesFilter/CategoriesFilter'
import SearchProduct from '../../../SearchProduct/SearchProduct'
import ProductsListAdmin from './ProductsListAdmin/ProductsListAdmin'
import AddProductButton from './NewProduct/AddProductButton/AddProductButton'

import axiosInstance from '../../../../common/http'

function ManageProducts() {
  const [products, setProducts] = useState([])
  const [results, setResults] = useState(null)
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')

  const storedToken = localStorage.getItem('authToken')

  useEffect(() => {
    if (currentCategory) {
      console.log('currCategory')
      const filteredByCategory = products.filter((product) => {
        return product.category._id === currentCategory
      })
      setResults(filteredByCategory)
      setCurrentSearch('')
    }

    if (currentSearch) {
      console.log('currSearch')
      const productsFound = products.filter((product) => {
        const regex = new RegExp(currentSearch, 'i')
        const nameFound = product.name.match(regex)
        const brandFound = product.brand.match(regex)

        return nameFound || brandFound
      })

      setResults(productsFound)
      setCurrentCategory('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentSearch])

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data.products)
        })
        .catch((err) => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="row pt-5 ">
      <div className="col-12 col-md-3">
        <AddProductButton />
        <SearchProduct setCurrentSearch={setCurrentSearch} />
        <CategoriesFilter
          setCategory={setCurrentCategory}
          setResults={setResults}
        />
      </div>
      <div className="col-12 col-md-9">
        <ProductsListAdmin results={results} products={products} />
      </div>
    </div>
  )
}

export default ManageProducts