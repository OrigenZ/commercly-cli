import ProductList from './ProductsList/ProductsList';
import ProductsListAdmin from './ProductsListAdmin/ProductsListAdmin';
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
            {/* <ProductsListAdmin /> */}
          </div>
        </section>
      </div>
    );
  }
  
  export default Shop;
  