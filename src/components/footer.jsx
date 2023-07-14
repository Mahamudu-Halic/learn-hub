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
            <div>
                <h3>information</h3>
                <p>about us</p>
                <p>more seaerch</p>
                <p>blog</p>
                <p>testimonials</p>
                <p>events</p>
            </div>
            <div>
                <h3>helpful links</h3>
                <p>services</p>
                <p>support</p>
                <p>terms & conditions
                <p>privacy policy</p>
                </p>
            </div>

            <div>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-linkedin"></i>
            </div>
        </footer>
    )
}

export default Footer