import axiosInstance from '../../../../../common/http/index'
import ProductCard from '../../../../ProductCard/ProductCard'
import './ProductListAdmin.css'

function ProductsListAdmin(props) {
  const { results, products, setProducts } = props

  const storedToken = localStorage.getItem('authToken')

  const handleDelete = async (id) => {
    await axiosInstance
      .delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const newProducts = products.filter((product) => product._id !== id)
        setProducts(newProducts)
      })
      .catch((err) => {})
    //TODO: set proper error handling
  }

  return (
    <div className="row">
      {!results &&
        products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              isShop={false}
            />
          )
        })}
      {results &&
        results.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              isShop={false}
            />
          )
        })}
      {results && results.length === 0 && (
        <p>No hay productos que mostrar</p> //TODO: Message
      )}
    </div>
  )
}

export default ProductsListAdmin