import CategoriesFilter from '../../../CategoriesFilter/CategoriesFilter'
import SearchProduct from '../../../SearchProduct/SearchProduct'
import ProductsListAdmin from './ProductsListAdmin/ProductsListAdmin'
import AddProductButton from './NewProduct/AddProductButton/AddProductButton'

function ManageProducts() {
  return (
    <div className="row pt-5 ">
      <div className="col-12 col-md-3">
        <AddProductButton />
        <SearchProduct />
        <CategoriesFilter />
      </div>
      <div className="col-12 col-md-9">
        <ProductsListAdmin />
      </div>
    </div>
  )
}

export default ManageProducts
