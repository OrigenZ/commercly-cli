import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./SearchProduct.css";

function SearchProduct(props) {
  const [query, setQuery] = useState();

  const { setCurrentSearch } = props;

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentSearch(query);
  };

  return (
    <div className="topbar">
      <form onSubmit={handleSubmit} className="search-container d-inline-block">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          name="query"
          placeholder="Search a product..."
        />
        <button type="submit" className="btn .btn-outline-secondary search-btn">
          <i className="fa fa-search text-muted"></i>
          <FontAwesomeIcon icon={faSearch} className="text-muted" />
        </button>
      </form>
      {/* 
        1º - Click en buscar
        2º - onSubmit event
        3º - Guardar el valor del input
        4º - Pasar valor al padre 
        5º - Padre hace una busqueda con el string
        6º - El padre la pasa a ProductList los foundProducts
        7º - ProductList renderiza el resultado
       */}
    </div>
  );
}

export default SearchProduct;
