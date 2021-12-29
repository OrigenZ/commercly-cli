import "./SearchBar.css";
import { Form, Col } from "react-bootstrap";

const SearchBar = (props) => {
  const { setCurrentSearch, setReset } = props;

  const handleSearch = (query) => {
    query ? setReset(false) : setReset(true);
    setCurrentSearch(query);
  };

  return (
    <Form className="search-form d-inline-block top-bar">
      <Form.Group className="p-0 m-0">
        <Col className="p-0" xs={12} >
          <Form.Control
            placeholder="Search"
            type='search'
            onChange={(e) => handleSearch(e.target.value)}
            name="query"
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
