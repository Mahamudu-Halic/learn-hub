import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer>
            <div>
                <div className="title">
                    <h2>Learn<span>Hub</span></h2>

                    <div className="about-us">
                        <h3>about us</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, similique.</p>
                    </div>

                    <div className="contact-us">
                        <h3>contact us</h3>
                        <p><i className="fa-solid fa-phone"></i> +233 552 802 788</p>
                        <p><i className="fa-solid fa-envelope"></i> mahamuduhalic@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="infomation">
                <h3>information</h3>
                <p>about us</p>
                <p>more seaerch</p>
                <p>blog</p>
                <p>testimonials</p>
                <p>events</p>
            </div>
            <div className="footer-links">
                <h3>helpful links</h3>
                <p>services</p>
                <p>support</p>
                <p>terms & conditions
                <p>privacy policy</p>
                </p>
            </div>

            <div className="media">
                <a href="#" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://twitter.com/mahamuduhalic" target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="https://github.com/Mahamudu-Halic" target="_blank">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/halic-mahamudu-361946216/" target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </div>
        </footer>
    )
}

export default Footer