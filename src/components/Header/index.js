import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class Header extends Component {
  render() {
    return (
      <div className="header-bg-container">
        <img
          className="header-logo"
          src="/images/VS_logo.jpg"
          alt="website logo"
        />
        <div className="header-menu-section">
          <Link to="/" className="link">
            <p className="header-menu-items">Home</p>
          </Link>
          <Link to="/" className="link">
            <p className="header-menu-items">Discover</p>
          </Link>
          <Link to="/" className="link">
            <p className="header-menu-items">About Us</p>
          </Link>
          <button className="header-button">Sign in</button>
        </div>
      </div>
    );
  }
}
export default Header;
