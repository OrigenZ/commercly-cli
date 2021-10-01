import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./SearchProduct.css";
import { Form, Button, Row, Col } from "react-bootstrap";

function SearchProduct(props) {
  const [query, setQuery] = useState();

  const { setCurrentSearch } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentSearch(query);
  };

  return (
    <div className="topbar">
      <Form
        onSubmit={handleSubmit}
        className="search-container d-inline-block"
        as={Row}
      >
        <Form.Group as={Row} className="p-0 m-0">
          <Col sm="10">
            <Form.Control
              type="search"
              placeholder="Search a product..."
              onChange={(e) => setQuery(e.target.value)}
              name="query"
            />
          </Col>
          <Col sm="2">
            <Button variant="light transparent" type="submit">
              <i className="fa fa-search text-muted"></i>
              <FontAwesomeIcon icon={faSearch} className="text-muted" />
            </Button>
          </Col>
        </Form.Group>
      </Form>
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
