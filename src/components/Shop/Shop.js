import React, { useEffect, useState } from 'react'

import ProductList from './ProductsList/ProductsList'
import SearchProduct from '../SearchProduct/SearchProduct'
import CategoriesFilter from '../CategoriesFilter/CategoriesFilter'

import axiosInstance from '../../common/http'

import './Shop.css'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [results, setResults] = useState(null)
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')

  useEffect(() => {
    if (currentCategory) {
      const filteredByCategory = products.filter((product) => {
        return product.category._id === currentCategory
      })
      setResults(filteredByCategory)
      setCurrentSearch('')
    }

    if (currentSearch) {
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
    axiosInstance
      .get(`/api/products`)
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((err) => {})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <section className="container" id="shop">
        <div className="d-flex flex-row justify-content-start">
          <div className="products-container col-12 col-md-3 ">
            <SearchProduct setCurrentSearch={setCurrentSearch} />
            <CategoriesFilter
              setCategory={setCurrentCategory}
              setResults={setResults}
            />
          </div>
          {/* TODO: check isAdmin and render ProductList / AdminProductList */}
          <div className="products-container col-12 col-md-9">
            <ProductList results={results} products={products} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
