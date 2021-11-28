import { Row, Col, Container, Card } from 'react-bootstrap'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sherab from '../../images/aboutUs/Sherab.jpg'
import Laura from '../../images/aboutUs/Laura.jfif'

import './AboutUsPage.css'

const AboutUsPage = () => {
  return (
    <Container className="section" id="about-us">
      {/*  <div className='section container text-center'> */}

      <Row xs={1} md={3} className="cards-div p-5 pt-0 pb-5 card-us">
        <Col>
          <Card className="m-5">
            <Card.Img variant="top" src={Sherab} />
            <Card.Body>
              <Card.Title>Sherab Pereira</Card.Title>
              <Card.Text>
                Hi, I'm Sherab Pereira, a full stack web developer, nice to see
                you here!.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-around text-muted">
                <a
                  href="https://github.com/OrigenZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset"
                >
                  <FontAwesomeIcon icon={faGithubSquare} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sherab-pereira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset"
                >
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
                Hi, I'm Laura, a front end leaned developer and graphic
                designer, nice to meet you!
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-around text-muted">
                <a
                  href="https://github.com/lauraAlabau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset"
                >
                  <FontAwesomeIcon icon={faGithubSquare} />
                </a>
                <a
                  href="https://www.linkedin.com/in/laura-alabau-rodriguez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutUsPage
