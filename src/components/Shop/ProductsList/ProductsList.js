// import { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../../../context/auth.context'
// import axios from 'axios'

// const API_URL = 'http://localhost:5005'

function ProductList() {
  // const { logInUser } = useContext(AuthContext)
  // const [products, setProducts] = useState([])
  // const [categories, setCategories] = useState([])
  // const [errorMessage, setErrorMessage] = useState(undefined)

  //  useEffect(()=>{
  //   axios
  //     .get(`${API_URL}/products`)
  //     .then((response) => {
  //         setProducts(response.products)
  //         setCategories(response.categories)
  //     })
  //     .catch((error) => {
  //       const errorDescription = error.response.data.message
  //       setErrorMessage(errorDescription)
  //     })
  // }, [products, categories])
 

    return (
      <div className="d-flex flex-row justify-content-between">
      <div id="filter-container col-12 col-md-4">
        <span className="filter-header text-uppercase border-bottom mb-2 d-inline-block">
          Filter by category
        </span>

        <div className="filters-wrapper">
          {/* Descomentar lo de abajo y arreglar*/}
          {/* {categories.map(category => {
              return (
                <div className="filter-item">
                  <a className="product-filter" href="/shop/filter/{{id}}">
                    {category.name}
                  </a>
                </div>)
            })}  */}
          {/* Borrar lo de abajo */}
          <div className="filter-item">
            <a className="product-filter" href="/shop/filter/{{id}}">
              Categories Names
            </a>
          </div>
          {/* Borrar lo de arriba */}
        </div>
      </div>
      <div className="products-container col-12 col-md-8">
        <div className="products d-flex row justify-content-between gy-4 gx-5">
           {/* Descomentar lo de abajo y arreglar*/}
           {/* {products.map(product => {
              return (
                <div className="product col-sm-12 col-md-6 col-lg-3 card">
                  <a href="/products/{{id}}">
                    <img
                      src="{{image.path}}"
                      className="w-100"
                      alt="Product Name"
                      className="card-img-top"
                    />

                    <div className="card-body">
                      <h3 className="card-text text-center">Product Name</h3>
                      <p className="description card-text text-center">Brand</p>
                      <p className="price card-text text-center">Price €</p>
                        //// If admin /////
                          <form action="/products/edit/{{id}}" method="get" className="mb-2">
                            <button type="submit" className="btn btn-outline-info edit-btn ">Edit</button>
                          </form>
                          <form action="/products/delete/{{id}}" method="post" className="mb-0">
                            <button type="submit" className="btn btn-outline-danger delete-btn">Delete</button>
                          </form>
                    </div>
                  </a>
                </div>
              )
            })}  */}
          {/* Borrar lo de abajo */}  
          <div className="product col-sm-12 col-md-6 col-lg-3 card">
            <a href="/products/{{id}}">
              <img
                src="{{image.path}}"
                className="w-100"
                alt="Product Name"
                className="card-img-top"
              />

              <div className="card-body">
                <h3 className="card-text text-center">Product Name</h3>
                <p className="description card-text text-center">Brand</p>
                <p className="price card-text text-center">Price €</p>
              </div>

            </a>
          </div>
        {/* Borrar lo de arriba */}  
        </div>
      </div>
    </div>
    );
  }
  
  export default ProductList;
  