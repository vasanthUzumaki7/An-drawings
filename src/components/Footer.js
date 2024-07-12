import React from 'react'
import { FaFacebook, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import '../components/footer.css'

const Footer = () => {
  return (
    <footer className='footer'  id='footer'>
      <div className='footer-top'>
        <div>
            <h2>AN paints</h2>
            <p>Painting with Precision, Leaving a Lasting Impression</p>
            <FaFacebook/>
            <FaInstagram/>
            <FaTwitterSquare/>
            <IoLogoYoutube/>
        </div>
        <div>
            <table>
                <tr>
                    <td>EMAIL</td>
                    <td>PHONE</td>   
                </tr>
                <tr>
                <td>liam@domain.com</td>
                <td>(111) 222-4321</td>
                </tr>
                <tr>
                    <td>OWNED BY</td>
                    <td>LOCATION</td>
                    
                </tr>
                <tr>
                <td>AN products.ltd</td>
                <td>Brooklyn, New York 14241</td>
                </tr>
                
            </table>
        </div>
      </div>
      
      <h3>© Copyright 2030 Mobirise - All Rights Reserved</h3>
    </footer>
  )
}

export default Footer
