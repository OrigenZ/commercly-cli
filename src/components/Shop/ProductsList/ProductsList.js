import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import "./ProductList.css";

function ProductList(props) {
  const { filteredProducts, products } = props;

  console.log(
    "filteredProducts",
    filteredProducts.products,
    "products",
    products
  );
//TODO: Make a Card component
  return (
    <div className="products d-flex row justify-content-start ">
      {!filteredProducts.products &&
        products.map((product) => {
          return (
            <Card
              id="card-products"
              className="col-sm-12 col-md-6 col-lg-3"
              key={product._id}
            >
              <Link to={`/products/${product._id}`} className="row list">
                <div className="img-container">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    className="w-100"
                    alt={product.name}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center">
                    {product.name}
                  </Card.Title>
                  <Card.Text>
                    <p className="text-center">{product.brand}</p>
                    <p className="text-center">{product.price} €</p>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
      {filteredProducts.products &&
        filteredProducts.products.map((product) => {
          return (
            <Card
              id="card-products"
              className="col-sm-12 col-md-6 col-lg-3"
              key={product._id}
            >
              <Link to={`/products/${product._id}`} className="row list">
                <div className="img-container">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    className="w-100"
                    alt={product.name}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center">
                    {product.name}
                  </Card.Title>
                  <Card.Text>
                    <p className="text-center">{product.brand}</p>
                    <p className="text-center">{product.price} €</p>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
      {filteredProducts.products && filteredProducts.products.length === 0 && (
        <p>No hay productos</p> //TODO: Message
      )}
    </div>
  );
}

export default ProductList;
