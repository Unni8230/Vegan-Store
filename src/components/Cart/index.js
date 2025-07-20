import { Component } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";
import { AiOutlineDelete } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import veganStoreContext from "../../Context/context";

class Cart extends Component {
  static contextType = veganStoreContext;

  state = {
    isLoading: true,
    wishList: [],
  };

  componentDidMount() {
    this.fetchCart();
    this.fetchWishlistProducts();
  }

  fetchWishlistProducts = () => {
    const wishList = localStorage.getItem("wishlist");
    if (wishList) {
      this.setState({ wishList: JSON.parse(wishList) });
    }
  };

  fetchCart = async () => {
    await this.context.refreshCart();
    this.setState({
      isLoading: false,
    });
  };

  renderView = () => {
    const { wishList } = this.state;
    return (
      <veganStoreContext.Consumer>
        {(value) => {
          if (!value?.isLoggedIn) return <Navigate to="/login" replace />;
          const { cartList, removeCartItem, UpdateCartQuantity } = value;
          const { name, user_id, product_id } = cartList;
          const cartItems = cartList.cart_items;
          const isCartEmpty = cartItems.length === 0;
          const totalAmount = cartItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          );
          const formattedTotal = `₹${totalAmount.toFixed(2)}`;
          return (
            <>
              <Header />
              <div className="cart-bg-container">
                <div className="cart-top-section">
                  <p className="user-name">Welcome Back, {name} </p>
                  <div className="cart-total_amount_section">
                    <h2 className="cart-heading">Shopping Cart</h2>
                    <p className="cart-total-amount">{formattedTotal}</p>
                  </div>
                </div>
                {isCartEmpty ? (
                  <div className="empty-cart-container">
                    <img
                      className="empty-cart-image"
                      src="https://res.cloudinary.com/dyareetre/image/upload/v1752824743/remove_the_backgroun_snjw4l.png"
                      alt="empty-cart"
                    />
                    <p className="empty-cart-heading">Empty Cart</p>
                    <p className="empty-cart-text">
                      Looks like you haven't made your choice yet!
                    </p>
                    <Link to="/all-products">
                      <button type="button" className="ripple-btn">
                        Explore More
                      </button>
                    </Link>
                  </div>
                ) : (
                  <ul className="cart-products-list-section">
                    {cartItems.map((eachItem) => (
                      <li
                        key={eachItem.product_id}
                        className="cart-each-product-list-item"
                      >
                        <div className="cart-item-link-container">
                          <div className="cart-product-details-section">
                            <Link
                              to={`/product-details/${eachItem.product_id}`}
                              className="cart-image-link-section"
                            >
                              <img
                                className="cart-product-thumbnail"
                                src={eachItem.image_url}
                                alt="cart-product-image"
                              />
                            </Link>
                            <div className="cart-product-title-description-section">
                              <p className="cart-product-title">
                                {eachItem.title}
                              </p>
                              <p className="cart-product-description">
                                {eachItem.description}
                              </p>
                              <p className="in-stock-text">In Stock</p>

                              <div className="cart-icon-menu-section">
                                <div className="quantity-selector">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      UpdateCartQuantity(
                                        eachItem.user_id,
                                        eachItem.product_id,
                                        "minus"
                                      );
                                    }}
                                  >
                                    −
                                  </button>
                                  <span>{eachItem.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      UpdateCartQuantity(
                                        eachItem.user_id,
                                        eachItem.product_id,
                                        "plus"
                                      );
                                    }}
                                  >
                                    +
                                  </button>
                                  <p className="cart-product-sm-price">
                                    ₹ {eachItem.price * eachItem.quantity}
                                  </p>
                                </div>
                                <div className="cart-buttons-container">
                                  <button
                                    className="cart-delete-button"
                                    onClick={() => {
                                      removeCartItem(
                                        eachItem.user_id,
                                        eachItem.product_id
                                      );
                                    }}
                                  >
                                    <AiOutlineDelete />
                                  </button>
                                  <button className="wishlist-btn">
                                    {wishList.some(
                                      (item) => item.id === eachItem.product_id
                                    ) ? (
                                      <FaHeart />
                                    ) : (
                                      <FaRegHeart />
                                    )}
                                  </button>
                                  <p className="organic-text">
                                    {eachItem.is_organic === 1
                                      ? "Organic"
                                      : "Mineral"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cart-product-price-section">
                            <p className="cart-product-price">
                              ₹ {eachItem.price * eachItem.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              ;
            </>
          );
        }}
      </veganStoreContext.Consumer>
    );
  };

  loadingView = () => {
    const { isLoading } = this.state;
    const loading = isLoading;
    const styles = {
      wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
      },
    };

    return (
      <div style={styles.wrapper}>
        <PuffLoader
          color="#a8e6cf"
          loading={isLoading}
          size={80}
          speedMultiplier={1}
        />
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ? this.loadingView() : this.renderView();
  }
}
export default Cart;
