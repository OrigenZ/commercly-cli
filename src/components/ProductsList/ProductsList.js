import Swal from "sweetalert2/src/sweetalert2";
import { Row } from "react-bootstrap";

import axiosInstance from "../../common/http";
import ProductCard from "../ProductCard/ProductCard";

import "./ProductList.css";

const ProductList = (props) => {
  const { results, products, setProducts, isShop, reset } = props;

  const storedToken = localStorage.getItem("authToken");

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `Product ${name} has been deleted.`, "success");

        axiosInstance
          .delete(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const newProducts = products.filter(
              (product) => product._id !== id
            );
            setProducts(newProducts);
            props.history.push("/my-account/admin/products");
          })
          .catch((err) => {});
      }
    });
  };

  /**
   * Busco con el search:
   * Hay resultados - Si - Muestra resultados
   * Hay resultados - No - Muestra "There are no results for 'adfadf'"
   * Si reset - Clear search box text and value
   *          - Show all items
   * Si busco por categoría - Clear search box text and value
   *
   * Busco por categoría
   * Hay resultados - Si - Muestra resultados
   * Hay resultados - No - "There are no results for the selected category"
   * Si reset - Show all products
   *
   */

  return (
    <div className="row">
      {(reset || !results) &&
        products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              isShop={isShop}
            />
          );
        })}
      {!reset &&
        results &&
        results.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              isShop={isShop}
            />
          );
        })}

      {!reset && results.length === 0 && (
        <p>No matching products found</p> //TODO: Message
      )}
    </div>
  );
};

export default ProductList;