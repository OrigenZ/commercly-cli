import { Link } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sherab from "../../images/aboutUs/Sherab.jfif";
import Laura from "../../images/aboutUs/Laura.jfif";

import './AboutUsPage.css'

function AboutUsPage() {
  return (
    <>
      {/*  <div className='section container text-center'> */}

      <Container className="section">
      <h2 className="text-center text-muted">Team</h2>
        <Row xs={1} md={2} className="p-5 pt-0 pb-5">
          <Col>
            <Card className="m-5">
              <Card.Img variant="top" src={Sherab} />
              <Card.Body>
                <Card.Title>Sherab Pereira</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-around text-muted">
                <a href="https://github.com/OrigenZ" target="_blank" rel="noopener noreferrer" className="text-reset">
                    <FontAwesomeIcon icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/sherab-pereira/" target="_blank" rel="noopener noreferrer" className="text-reset">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>

                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="m-5">
              <Card.Img variant="top" src={Laura} />
              <Card.Body>
                <Card.Title>Laura Alabau</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-around text-muted">
                <a href="https://github.com/lauraAlabau" target="_blank" rel="noopener noreferrer" className="text-reset">
                    <FontAwesomeIcon icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/laura-alabau-rodriguez" target="_blank" rel="noopener noreferrer" className="text-reset">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutUsPage;
