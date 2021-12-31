import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

import './ProductsListAdmin.css'

function ProductsListAdmin(props) {
  const { handleDelete, results, products, reset } = props

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
    setPageCount(Math.ceil(products.length / perPage))
    return products.slice(offset, offset + perPage)
  }

  useEffect(() => {
    setData(getData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, products, handleDelete])

  useEffect(() => {
    setData(getData())
    setOffset(0)
    setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, reset])

  return (
    <>
      <div id="products-list-admin">
        <Row id="head-products-list">
          <Col xs={12} lg={2}>
            <p>SKU</p>
          </Col>
          <Col xs={12} lg={2}>
            <p>Name</p>
          </Col>
          <Col xs={12} lg={2}>
            <p>Category</p>
          </Col>
          <Col xs={12} lg={1} className="text-lg-center">
            <p>Quantity</p>
          </Col>
          <Col xs={12} lg={2} className="text-lg-center">
            <p>Price</p>
          </Col>
          <Col xs={12} lg={3} className="text-lg-center" />
        </Row>

        {data.map((product) => (
          <Row key={product._id} className="products-list">
            <Col xs={12} lg={2}>
              <p>{product.sku}</p>
            </Col>
            <Col xs={12} lg={2}>
              <p>{product.name}</p>
            </Col>
            <Col xs={12} lg={2}>
              <p>{product.category.name}</p>
            </Col>
            <Col xs={12} lg={1} className="text-lg-center">
              <p>{product.quantity}</p>
            </Col>
            <Col xs={12} lg={2} className="text-lg-center">
              <p>{product.totalPrice} €</p>
            </Col>

            <Col xs={12} lg={3}>
              <Row>
                <Col xs={6} className="actions-btn">
                  <div className="mb-2">
                    <Link
                      to={`/my-account/admin/product/edit/${product._id}`}
                      className="btn btn-outline-secondary edit-btn w-100"
                    >
                      Edit
                    </Link>
                  </div>
                </Col>
                <Col xs={6} className="actions-btn">
                  <div className="mb-0">
                    <div
                      onClick={() => handleDelete(product._id, product.name)}
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

        {!data.length && (
          <Col xs={12} className="text-center p-5">
            No matching products found
          </Col>
        )}
      </div>

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
    </>
  )
}

export default ProductsListAdmin
