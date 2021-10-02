import { Link } from 'react-router-dom'

import './HomePage.css'

const Homepage = () => {
  return (
    <>
      <section className="d-flex justify-content-center" id="home">
        <div className="call-to-action d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-muted fw-bold text-center">
            All the products you need in one place
          </h1>
          <Link to={`/shop`} className="btn btn-outline-secondary py-3 px-5">
            See all products
          </Link>
        </div>
      </section>
    </>
  )
}

export default Homepage
