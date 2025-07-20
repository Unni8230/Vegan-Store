import { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import veganStoreContext from "../../Context/context";
import "./index.css";

const headerCategories = [
  { id: "Home", displayText: "Home", redirectUrl: "/" },
  { id: "Explore", displayText: "Explore", redirectUrl: "/all-products" },
  { id: "WishList", displayText: "Wishlist", redirectUrl: "/wishlist" },
];

const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

class Header extends Component {
  state = {
    menuOpen: false,
  };

  setMenuOpen = () => {
    this.setState((prev) => ({
      menuOpen: !prev.menuOpen,
    }));
  };

  clickProfileIcon = () => {
    this.props.navigate("/login");
  };

  render() {
    const { menuOpen } = this.state;
    return (
      <veganStoreContext.Consumer>
        {(value) => {
          const { activeMenu, changeActiveMenu, logOut, cartList, isLoggedIn } =
            value;
          const cartItems = cartList?.cart_items || [];
          const cartLength = cartItems.length;
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
                    key={eachItem.id}
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
                <Link
                  to="/cart"
                  className="link"
                  onClick={() => {
                    changeActiveMenu("Cart");
                  }}
                >
                  <li
                    className={`header-menu-items ${activeMenu === "Cart" ? "activeHeader" : ""}`}
                  >
                    Cart
                    {cartLength > 0 ? (
                      <span className="cart-quantity-text">{cartLength}</span>
                    ) : null}
                  </li>
                </Link>
                {isLoggedIn ? (
                  <Popup
                    trigger={
                      <button
                        className="header-button"
                        onClick={this.clickProfileIcon}
                      >
                        {isLoggedIn ? <FaRegUser /> : <FaSignInAlt />}
                      </button>
                    }
                    contentStyle={{
                      width: "100px",
                      height: "50px",
                      borderRadius: "12px",
                      padding: "5px",
                    }}
                    position="bottom"
                  >
                    <button
                      className="signout-button"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </Popup>
                ) : (
                  <button
                    className="header-button"
                    onClick={this.clickProfileIcon}
                  >
                    {isLoggedIn ? <FaRegUser /> : <FaSignInAlt />}
                  </button>
                )}
              </ul>

              <div
                className={`header-menu-sm-section ${menuOpen ? "open" : "hide"}`}
              >
                {headerCategories.map((eachItem) => (
                  <Link
                    to={eachItem.redirectUrl}
                    className="link"
                    key={eachItem.id}
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
                <Link
                  to="/cart"
                  className="link"
                  onClick={() => {
                    changeActiveMenu("Cart");
                  }}
                >
                  <li
                    className={`header-menu-items ${activeMenu === "Cart" ? "activeHeader" : ""}`}
                  >
                    <GiShoppingCart />
                    {cartLength > 0 ? (
                      <span className="cart-quantity-text">{cartLength}</span>
                    ) : null}
                  </li>
                </Link>
                {isLoggedIn ? (
                  <Popup
                    trigger={
                      <button
                        className="header-button"
                        onClick={this.clickProfileIcon}
                      >
                        {isLoggedIn ? <FaRegUser /> : <FaSignInAlt />}
                      </button>
                    }
                    contentStyle={{
                      width: "100px",
                      height: "50px",
                      borderRadius: "12px",
                      padding: "5px",
                    }}
                    position="bottom"
                  >
                    <button
                      className="signout-button"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </Popup>
                ) : (
                  <button
                    className="header-button"
                    onClick={this.clickProfileIcon}
                  >
                    {isLoggedIn ? <FaRegUser /> : <FaSignInAlt />}
                  </button>
                )}
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
export default withNavigation(Header);
