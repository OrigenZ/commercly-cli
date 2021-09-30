/* import CategoriesFilter from "../../../CategoriesFilter/CategoriesFilter"; */
import CategoriesFilter from '../../../CategoriesFilter/CategoriesFilter'
import ProductsListAdmin from './ProductsListAdmin/ProductsListAdmin'

function ManageProducts() {
  return (
    <div className="row">
      <div className="col-12 col-md-3">
        <CategoriesFilter />
      </div>
      <div className="col-12 col-md-9">
        <ProductsListAdmin />
      </div>
    </div>
  )
}

export default ManageProducts
