import { Row } from "react-bootstrap";
import ProductCard from "../../ProductCard/ProductCard";

import "./ProductList.css";

function ProductList(props) {
  const { products, results } = props;


  return (
    <div className="products d-flex row justify-content-start ">
      {(!results || !results.length)  && 
        products.map((product) => {
          return (
            <ProductCard key={product._id} product={product} isShop={true} as={Row} />
          );
        })
      }

      {results &&
        results.map((product) => {
          return (
            <ProductCard key={product._id} product={product} isShop={true} />
          );
        })
      }

      { (!results || ( results && results.length === 0)) && (
        <p>No hay productos que mostrar</p> //TODO: Message
      )}
    </div>
  );
}


export default ProductList;
