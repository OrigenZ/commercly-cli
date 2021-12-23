import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
    return (
        <Spinner animation='grow' variant="info" className="spinner-border text-secondary position-absolute top-50 start-50">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default LoadingSpinner