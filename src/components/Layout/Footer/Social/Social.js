import { faFacebook  } from "@fortawesome/free-brands-svg-icons";
import { faTwitter  } from "@fortawesome/free-brands-svg-icons";
import { faGoogle  } from "@fortawesome/free-brands-svg-icons";
import { faInstagram  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Social(){
    return(
        <div className="align-items-center">
            <h6 class="text-uppercase fw-bold mb-4 text-center">
              Social 
            </h6>
            <div class="d-flex social justify-content-around">
              <a href="#!" class="text-reset">
                <FontAwesomeIcon icon={faFacebook } />
              </a>
              <a href="#!" class="text-reset">
                <FontAwesomeIcon icon={faTwitter } />
              </a>
              <a href="#!" class="text-reset">
              <FontAwesomeIcon icon={faGoogle } />
              </a>
              <a href="#!" class="text-reset">
                <FontAwesomeIcon icon={faInstagram } />
              </a>
            </div>
        </div>
    )
}

export default Social