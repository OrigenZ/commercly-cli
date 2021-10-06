import React from "react";
import { Link } from "react-router-dom";

import "./AddProductButton.css";

const AddProductButton = () => {
  return (
    <Link
      to={`/admin/product/create`}
      className="btn btn-outline-success mb-4 add-button"
    >
      Add product
    </Link>
  );
};

export default AddProductButton;
