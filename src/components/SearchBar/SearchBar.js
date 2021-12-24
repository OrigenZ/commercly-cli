import "./SearchBar.css";
import { Form, Col } from "react-bootstrap";

const SearchBar = (props) => {
  const { setCurrentSearch, setReset } = props;

  const handleSearch = (e) => {
    if (e.target.value) setReset(false);
    else setReset(true);

    setCurrentSearch(e.target.value);
  };

  return (
    <Form className="search-form d-inline-block top-bar">
      <Form.Group  className="p-0 m-0">
        <Col className="p-0" xs={12} lg={12} >
          <Form.Control
            placeholder="Search"
            type='search'
            onChange={(e) => handleSearch(e)}
            name="query"
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
