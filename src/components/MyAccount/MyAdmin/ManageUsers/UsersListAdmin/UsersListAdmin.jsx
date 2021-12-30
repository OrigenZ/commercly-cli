
import UserCard from '../../../../UserCard/UserCard'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { Row, Col } from 'react-bootstrap'

import './UsersListAdmin.css'

const UsersListAdmin = (props) => {
  const { users, handleDelete } = props

  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)


  const handlePageClick = ({ selected }) => {
    setOffset(Math.ceil(selected * perPage))
  }

  const getData = () => {
    setPageCount(Math.ceil(users.length / perPage))
    return users.slice(offset, offset + perPage)
  }

  useEffect(() => {
    setData(getData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, users, handleDelete])

  return (
    <Col id="users-list-admin" xs={12}>
      <Row xs={12} id="head-users-list">
        <Col xs={12} sm={3} lg={3}>
          <p>ID</p>
        </Col>
        <Col xs={12} sm={2} lg={2}>
          <p>Created at</p>
        </Col>
        <Col xs={12} sm={1} lg={2}>
          <p className="text-center">Admin</p>
        </Col>
        <Col xs={12} sm={3} lg={3}>
          <p>Email</p>
        </Col>
        <Col xs={12} sm={3} lg={2} />
      </Row>

      <Col xs={12}>
        {data.map((user) => (
          <UserCard key={user._id} userData={user} handleDelete={handleDelete} />
        ))}

        {!data.length && <Col xs={12} className="text-center p-5">No users found</Col>}
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
        />
      </Row>
    </Col>
  )
}

export default UsersListAdmin
