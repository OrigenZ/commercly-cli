import ProductList from "./ProductsList/ProductsList";
import SearchProduct from "../SearchProduct/SearchProduct";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";

import "./Shop.css";

function Shop() {
  return (
    <div>
      <section className="container" id="shop">
        <div className="d-flex flex-row justify-content-start">
          <div className="products-container col-12 col-md-3 ">
          <SearchProduct />
            <CategoriesFilter />
          </div>
          <div className="products-container col-12 col-md-9">
            <ProductList />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
