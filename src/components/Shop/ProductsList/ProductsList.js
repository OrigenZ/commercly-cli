import ProductCard from "../../ProductCard/ProductCard";

import "./ProductList.css";

function ProductList(props) {
  const { products, results } = props;

  console.log("results", results);

  //TODO si hay 0 mostrar 0

  return (
    <div className="products d-flex row justify-content-start ">
      {(!results || !results.length)  && 
        products.map((product) => {
          return (
            <ProductCard key={product._id} product={product} isShop={true} />
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

      { results.length === 0 && !results && (
        <p>No hay productos que mostrar</p> //TODO: Message
      )}
    </div>
  );
}


export default ProductList;
