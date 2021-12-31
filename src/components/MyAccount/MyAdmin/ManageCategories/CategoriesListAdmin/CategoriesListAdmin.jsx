import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

import './CategoriesListAdmin.css'

function CategoriesListAdmin(props) {
  const { categories, handleDelete, results, reset } = props

  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const [perPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(null)

  const handlePageClick = ({ selected }) => {
    setPage(selected)
    setOffset(Math.ceil(selected * perPage))
  }

  const getData = () => {
    if (!reset) {
      setPageCount(Math.ceil(results.length / perPage))
      return results.slice(offset, offset + perPage)
    }
    setPageCount(Math.ceil(categories.length / perPage))
    return categories.slice(offset, offset + perPage)
  }

  useEffect(() => {
    setData(getData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, results, categories, handleDelete])

  useEffect(() => {
    setOffset(0)
    setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  return (
    <Col id="categories-list-admin" xs={12}>
      <Row id="head-categories-list">
        <Col xs={12} lg={2}>
          <p>Name</p>
        </Col>
        <Col xs={12} lg={8} className="text-lg-center">
          <p>Description</p>
        </Col>
        <Col xs={12} lg={2} className="text-lg-center" />
      </Row>

      <Col xs={12}>
        {data.map((category) => (
          <Row key={category._id} className="category-row">
            <Col xs={12} sm={4} lg={2}>
              <p>{category.name}</p>
            </Col>
            <Col xs={12} sm={8} lg={8}>
              <p>{category.description}</p>
            </Col>

            <Col xs={12} sm={12} lg={2}>
              <Row>
                <Col xs={6} sm={6} lg={6} className="actions-btn">
                  <Col>
                    <Link
                      to={`/my-account/admin/category/edit/${category._id}`}
                      className="btn btn-outline-secondary edit-btn w-100"
                    >
                      Edit
                    </Link>
                  </Col>
                </Col>
                <Col xs={6} sm={6} lg={6} className="actions-btn">
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(category._id, category.name)}
                    className="delete-btn w-100"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}

        {!data.length && (
          <Col xs={12} className="text-center p-5">
            No matching categories found
          </Col>
        )}
      </Col>

      <Row className="pagination">
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeclassname={'active'}
          renderOnZeroPageCount={null}
          forcePage={page}
        />
      </Row>
    </Col>
  )
}

export default CategoriesListAdmin
