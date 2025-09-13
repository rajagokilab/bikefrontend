import React from "react";
import { FaWhatsapp, FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import { IoLocationOutline, IoGlobeOutline, IoCallOutline } from "react-icons/io5";
import Logo from '../assets/flogo.png';
import { Link } from "react-router-dom";
import fbike from '../assets/35.png';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: "#1d445bff", 
      color: "#fff", 
      padding: "40px", 
      display: "flex", 
      justifyContent: "space-around", 
      flexWrap: "wrap", 
      fontSize: "16px" // corrected font size
    }}>
      
      {/* Logo Section */}
      <div style={{ flex: "1", minWidth: "200px", marginBottom: "20px", textAlign: "center" }}>
        <Link to="/">
          <img src={Logo} alt="DriveRP" style={{ height: "80px", width: "auto" }} />
        </Link>
        <p>Get in touch</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }} aria-label="Social Media Links">
          <a href="https://wa.me/yourNumber"><FaWhatsapp size={30} /></a>
          <a href="https://youtube.com/yourChannel"><FaYoutube size={30} /></a>
          <a href="https://instagram.com/yourProfile"><FaInstagram size={30} /></a>
          <a href="https://facebook.com/yourPage"><FaFacebookF size={30} /></a>
        </div>
      </div>

      {/* Navigation Section */}
      <div style={{ flex: "1", minWidth: "150px",font:"bold", marginBottom: "20px", textAlign: "center" }}>
        <h1 className="font-bold text-xl">Menu</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Buy Bike</li>
          <li>Sell Bike</li>
        </ul>
      </div>

      {/* Products Section */}
      <div style={{ flex: "1", minWidth: "150px", marginBottom: "20px", textAlign: "center" }}>
        <h1 className="font-bold text-xl">Products</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Electric Two-Wheelers</li>
          <li>Motorcycles</li>
          <li>Scooters</li>
          <li>Mopeds</li>
          <li>ATV</li>
          <li>Custom Bikes</li>
        </ul>
      </div>

      {/* Bike Image Section */}
      <div style={{ flex: "1", minWidth: "200px", marginBottom: "20px", textAlign: "center" }}>
        <img src={fbike} alt="DriveRP" style={{ height: "150px", width: "auto" }} />
      </div>

      {/* Contact Section */}
      <div style={{ flex: "1", minWidth: "200px", marginBottom: "20px", textAlign: "center" }}>
        <h1 className="font-bold text-xl" >Address</h1>
        <p><IoLocationOutline/> 51, Rajaji Street, GST Road, Chengalpattu-603104</p>
        <p><IoGlobeOutline /> www.DriveRp.in</p>
        <p><IoCallOutline /> +91 987 952 1234</p>
      </div>

    </footer>
  );
};

export default Footer;
