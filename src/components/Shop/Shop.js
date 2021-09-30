import ProductList from "./ProductsList/ProductsList";
import SearchProduct from "../SearchProduct/SearchProduct";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";

function Shop() {
  return (
    <div>
      <section className="container " id="product-gallery">
        <div className="d-flex flex-row justify-content-start">
          <div className="products-container col-12 col-md-2 ">
            <SearchProduct />
            <CategoriesFilter />
          </div>
          <div className="products-container col-12 col-md-10">
            <ProductList />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
