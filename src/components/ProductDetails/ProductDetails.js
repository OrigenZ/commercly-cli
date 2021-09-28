//Ejemplo
// const getProduct = () => {
//   // Get the token from the localStorage
//   const storedToken = localStorage.getItem('authToken')
//   // Send the token through the request "Authorization" Headers

//   axios
//     .get(
//       `${API_URL}/api/product/${_id}`,
//       { headers: { Authorization: `Bearer ${storedToken}` } },
//     )
//     .then((response) => setProduct(response.data))
//     .catch((error) => console.log(error))
// }

function ProductDetails() {
  return (
    <div>
      <section
        id="product-details"
        className="container d-flex justify-content-center"
      >
        <div className="product-card">
          <div className="col-md-12">
            <div className="product-detail card">
              <div className="">
                <img src="{{image.path}}" alt="Product Name" className="w-100" />
              </div>
              <div className="product-body text-center">
                <h3 className="heading heading-5 strong-600 text-capitalize">
                  Product Name
                </h3>
                <p className="product-price">Price €</p>
                <p className="product-description">Description</p>
                <div className="product-buttons mt-4">
                  <div className="row align-items-center">
                    <form action="/shop/add-item" method="post">
                      <button
                        type="submit"
                        className="btn btn-outline-success cart-btn"
                      >
                        <i className="fa fa-shopping-cart"></i>&emsp;Add to cart
                      </button>
                      <input type="hidden" value="{{id}}" name="productId" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
