import ProductCard from "../../ProductCard/ProductCard";

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
            <ProductCard
              key={product._id}
              product={product}
              isShop={true}
            />
          );
        })}
      {filteredProducts.products &&
        filteredProducts.products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              isShop={true}
            />
          );
        })}
      {filteredProducts.products && filteredProducts.products.length === 0 && (
        <p>No hay productos</p> //TODO: Message
      )}
    </div>
  );
}

export default ProductList;
