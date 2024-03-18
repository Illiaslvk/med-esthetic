import React from "react"
import "./Footer.css"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ {currentYear} ABOUT-US</p>
        </div>
    )
}

export default Footer
