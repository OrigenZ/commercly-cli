import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";

import './SearchProduct.css'

function SearchProduct() {
  return (
    <div className="topbar">
          <form
            className="search-container d-inline-block"
            action="/shop/search"
            method="post"
          >
            <input
              type="search"
              name="query"
              placeholder="Search a product..."
            />
            <button type="submit" className="btn .btn-outline-secondary search-btn">
              <i className="fa fa-search text-muted"></i>
              <FontAwesomeIcon icon={faSearch} className="text-muted" />
            </button>
          </form>
          <div className="clear-filters">
            <a className=" text-muted" href="/shop">
              Reset Filter
            </a>
          </div>
        </div>
      
  );
}

export default SearchProduct;
