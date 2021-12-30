import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import ProductsList from '../../components/ProductsList/ProductsList'
import SearchBar from '../../components/SearchBar/SearchBar'
import CategoriesFilter from '../../components/CategoriesFilter/CategoriesFilter'

import axiosInstance from '../../common/http'

import './ShopPage.css'

const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [results, setResults] = useState([])
  const [reset, setReset] = useState(true)
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get(`/api/products`)
      setProducts(response.data.products)
    } catch (err) {
      console.log(err.message)
      //TODO: set proper error handling
    }
  }


  useEffect(() => {
    if (currentCategory) {
      const filteredByCategory = [...products].filter((product) => {
        return product.category._id === currentCategory
      })
      setResults(filteredByCategory)
      setCurrentSearch('')
    }

    if (currentSearch) {
      const productsFound = [...products].filter((product) => {
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
    getProducts()
  }, [])

  return (
    <Container id="shop">
      <Row>
        <Col xs={12} md={3} lg={3} className="filter-container">
          <SearchBar setCurrentSearch={setCurrentSearch} setReset={setReset} />
          <CategoriesFilter
            setCurrentCategory={setCurrentCategory}
            setReset={setReset}
          />
        </Col>

        <Col xs={12} md={9} lg={9} className="products-container">
          <ProductsList
            results={results}
            products={products}
            handleDelete={() => { }}
            isShop={true}
            reset={reset}
          />
        </Col>
      </Row>
    </Container>
  )
};

export default ShopPage;
