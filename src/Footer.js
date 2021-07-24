import React from 'react';
import "./Footer.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';


function Footer() {
    return (
        <div className="footer">
            <p className="footer_header">C<span>O</span>VID-INF<span>O</span></p>
            <p className="design_p">Designedby : Prajyot Burbure</p>
            <div className="icons">
                <a target="_blank"  href="https://www.facebook.com/prajyotratnadipburbure.burbure?ref=bookmarks"><FacebookIcon  className="facbook"></FacebookIcon></a>
                <a target="_blank" href="https://www.instagram.com/prajyot_burbure/?hl=en">@prajyot_burbure<InstagramIcon className="instagram"></InstagramIcon></a>
                <a href="#"><TwitterIcon className="twitter"></TwitterIcon></a>
            </div>
        </div>
    )
}

export default Footer;
