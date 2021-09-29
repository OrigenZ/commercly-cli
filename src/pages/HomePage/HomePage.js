import './HomePage.css'

function Homepage(){
    return(
        <div className='section'>
            <section className="d-flex justify-content-center" id="home">
                <div className="call-to-action d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-muted fw-bold text-center">All the products you need in one place</h1>
                        <a href="/shop" className="btn btn-outline-secondary py-3 px-5">See all products</a>
                </div>
            </section>
        </div>
    )
}

export default Homepage