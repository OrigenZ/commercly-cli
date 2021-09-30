function SearchProduct() {
  return (
    <div>
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
            </button>
          </form>
          <div className="clear-filters">
            <a className="" href="/shop">
              Reset Filter
            </a>
          </div>
        </div>
      
  );
}

export default SearchProduct;
