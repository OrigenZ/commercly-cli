import ProductList from './ProductsList/ProductsList';
import SearchProduct from './SearchProduct/SearchProduct'

function Shop() {
    return (
      <div>
        <section className="container " id="product-gallery">
          <div className="topbar">
            <SearchProduct />
          </div>
          <div>
            <ProductList />
          </div>
        </section>
      </div>
    );
  }
  
  export default Shop;
  