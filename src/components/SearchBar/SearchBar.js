import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import './SearchBar.css'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')

  const { setCurrentSearch, setReset } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    setReset(false)
    if (query !== null) setCurrentSearch(query)
  }

  return (
    <div className="topbar">
      <Form onSubmit={handleSubmit} className="search-container d-inline-block">
        <Form.Group as={Row} className="p-0 m-0">
          <Col xs={10} sm={10} lg={10}>
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
              name="query"
            />
          </Col>
          <Col xs={2} sm={2} lg={2}>
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

export default SearchBar
