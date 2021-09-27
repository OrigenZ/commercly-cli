import Footer from "./Footer/Footer"
import Navbar from "./Navbar/Navbar"


function Layout(props){
    return(
        <div>
            <Navbar />
                {props.children}
            <Footer />
        </div>
    )
}

export default Layout