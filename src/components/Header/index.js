import { Component } from "react";
import { Link, redirect } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import veganStoreContext from "../../Context/context";
import "./index.css";

const headerCategories = [
  { id: "Home", displayText: "Home", redirectUrl: "/" },
  { id: "Explore", displayText: "Explore", redirectUrl: "/all-products" },
  { id: "WishList", displayText: "Wishlist", redirectUrl: "/wishlist" },
  { id: "Cart", displayText: "Cart", redirectUrl: "/cart" },
];

class Header extends Component {
  state = {
    menuOpen: false,
  };

  setMenuOpen = () => {
    this.setState((prev) => ({
      menuOpen: !prev.menuOpen,
    }));
  };

  render() {
    const { menuOpen } = this.state;
    return (
      <veganStoreContext.Consumer>
        {(value) => {
          const { activeMenu, changeActiveMenu } = value;
          console.log(activeMenu);
          return (
            <div className="header-bg-container">
              <Link
                to="/"
                onClick={() => {
                  changeActiveMenu("Home");
                }}
              >
                <img
                  className="header-logo"
                  src="/images/VS_logo.png"
                  alt="website logo"
                />
              </Link>
              <ul className="header-menu-md-section">
                {headerCategories.map((eachItem) => (
                  <Link
                    to={eachItem.redirectUrl}
                    className="link"
                    onClick={() => {
                      changeActiveMenu(eachItem.id);
                    }}
                  >
                    <li
                      key={eachItem.id}
                      className={`header-menu-items ${activeMenu === eachItem.id ? "activeHeader" : ""}`}
                    >
                      {eachItem.displayText}
                    </li>
                  </Link>
                ))}
                <button className="header-button">Sign in</button>
              </ul>

              <div
                className={`header-menu-sm-section ${menuOpen ? "open" : "hide"}`}
              >
                {headerCategories.map((eachItem) => (
                  <Link
                    to={eachItem.redirectUrl}
                    className="link"
                    onClick={() => {
                      changeActiveMenu(eachItem.id);
                    }}
                  >
                    <li
                      key={eachItem.id}
                      className={`header-menu-items ${activeMenu === eachItem.id ? "activeHeader" : ""}`}
                    >
                      {eachItem.displayText}
                    </li>
                  </Link>
                ))}
                <button className="header-button">Sign in</button>
              </div>
              <button className="hamburger" onClick={this.setMenuOpen}>
                ☰
              </button>
            </div>
          );
        }}
      </veganStoreContext.Consumer>
    );
  }
}
export default Header;
