import React from "react";
import { Link } from "react-router-dom";

import "./AddProductButton.css";

const AddProductButton = () => {
  return (
    <Link
      to={`/my-account/admin/product/create`}
      className="btn btn-outline-success add-button"
    >
      Add product
    </Link>
  );
};

export default AddProductButton;
