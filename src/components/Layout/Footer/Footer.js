import Links from "./Links/Links";
import Social from "./Social/Social";
import Contact from "./Contact/Contact";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import Copyright from "./Copyright/Copyright"

function Footer(){
    return(
        <footer className="text-center text-lg-start bg-light text-muted">
            <section className="border-top">
               <div className="container text-center text-md-start pt-5">
                    <div className="row mt-3">
                        <div className="col-md-5 col-lg-4 col-xl-3 mx-auto mb-4 d-flex flex-column align-items-center">
                            <Links />
                        </div>
                        <div className="col-md-2 col-lg-4 col-xl-3 mx-auto mb-4">
                            <Social />
                        </div>
                        <div className="col-md-5 col-lg-4 col-xl-3 mx-auto mb-md-0 mb-4 contact">
                            <Contact />
                        </div>
                    </div>
                </div>
            </section>
            <section className="d-flex justify-content-center justify-content-center p-4 border-top border-bottom">
                <PaymentMethods />
            </section>
            <section>
                <Copyright />
            </section>
        </footer>             
    )
}

export default Footer