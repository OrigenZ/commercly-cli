import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import './SearchProduct.css'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchProduct = (props) => {
  const [query, setQuery] = useState()

  const { setCurrentSearch } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentSearch(query)
  }

  return (
    <div className="topbar">
      <Form onSubmit={handleSubmit} className="search-container d-inline-block">
        <Form.Group as={Row} className="p-0 m-0">
          <Col sm="10">
            <Form.Control
              type="search"
              placeholder="Search a product..."
              onChange={(e) => setQuery(e.target.value)}
              name="query"
            />
          </Col>
          <Col sm="2">
            <Button variant="light transparent" type="submit">
              <i className="fa fa-search text-muted"></i>
              <FontAwesomeIcon icon={faSearch} className="text-muted" />
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SearchProduct
