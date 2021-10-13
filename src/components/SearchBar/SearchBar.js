import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBar = (props) => {
  const { setCurrentSearch, setReset } = props;

  const handleSearch = (e) => {
    if (e.target.value) setReset(false);
    else setReset(true);

    setCurrentSearch(e.target.value);
  };

  return (
    <Form className="search-container d-inline-block top-bar">
      <Form.Group  className="p-0 m-0">
        <Col className="p-0" xs={12} lg={12} >
          <Form.Control
            placeholder="Search"
            type='search'
            onChange={(e) => handleSearch(e)}
            name="query"
          />
        </Col>
        {/* <Col xs={2} sm={2} lg={2} className="search-icon">
          <Button variant="light transparent" type="submit">
            <i className="fa fa-search text-muted"></i>
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
          </Button>
        </Col> */}
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
