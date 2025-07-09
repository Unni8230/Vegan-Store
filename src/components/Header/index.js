import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class Header extends Component {
  state = {
    menuOpen: false,
  }

  setMenuOpen = () => {
    this.setState(prev => ({
      menuOpen: !prev.menuOpen
    }))
  }

  render() {
    const {menuOpen} = this.state
    console.log(menuOpen)
    return (
      <div className="header-bg-container">
        <img
          className="header-logo"
          src="/images/VS_logo.jpg"
          alt="website logo"
        />
       
        <div className="header-menu-md-section">
          <Link to="/" className="link">
            <p className="header-menu-items">Home</p>
          </Link>
          <Link to="/all-products" className="link">
            <p className="header-menu-items">Discover</p>
          </Link>
          <Link to="/" className="link">
            <p className="header-menu-items">About Us</p>
          </Link>
          <button className="header-button">Sign in</button>
        </div>
        <div className={`header-menu-sm-section ${menuOpen ? 'open' : 'hide'}`}>
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
        <button className="hamburger" onClick={this.setMenuOpen}>☰</button>
      </div>
    );
  }
}
export default Header;
