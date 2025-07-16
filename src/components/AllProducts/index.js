import { Component } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Header from "../Header";
import Footer from "../Footer";
import { IoSearchOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./index.css";

const filterMenu = [
  { id: "All", displayText: "All", Thumbnail: "/images/Filter/All_thumb.jpg" },
  {
    id: "Fruits",
    displayText: "Fruits",
    Thumbnail: "/images/Filter/Fruits_thumb.jpg",
  },
  {
    id: "Vegetables",
    displayText: "Vegetables",
    Thumbnail: "/images/Filter/Veg_thumb.jpg",
  },
  {
    id: "Leafy Greens",
    displayText: "Leaves",
    Thumbnail: "/images/Filter/Leafy_thumb.jpg",
  },
  {
    id: "Vegan Groceries",
    displayText: "Groceries",
    Thumbnail: "/images/Filter/VeganGroceries.jpg",
  },
  {
    id: "Nuts & Seeds",
    displayText: "Nuts",
    Thumbnail: "/images/Filter/Nuts_thumb.jpg",
  },
  {
    id: "Pantry Staples",
    displayText: "Pantries",
    Thumbnail: "/images/Filter/Pantries_thumb.jpg",
  },
];

const statusMenu = {
  initial: "INITIAL",
  inprogress: "IN PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class AllProducts extends Component {
  state = {
    productsList: [],
    filteredProducts: [],
    activeCategory: "All",
    searchInput: "",
    wishList: [],
    status: statusMenu.initial,
  };

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.fetchProductDetails();
    this.fetchWishlistProducts();
  }

  fetchWishlistProducts = () => {
    const wishList = localStorage.getItem("wishlist");
    if (wishList) {
      this.setState({ wishList: JSON.parse(wishList) });
    }
  };

  toggleItemstoWishlist = (product) => {
    const { wishList } = this.state;
    const alreadyAdded = wishList.some((item) => item.id === product.id);
    if (!alreadyAdded) {
      const updatedWishlist = [...wishList, product];
      this.setState({ wishList: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = wishList.filter((each) => each.id !== product.id);
      this.setState({ wishList: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  updateSearchQuery = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  changeActiveCetegory = (id) => {
    const { productsList } = this.state;
    if (id === "All") {
      this.setState({
        activeCategory: id,
        filteredProducts: productsList,
      });
    } else {
      this.setState({
        activeCategory: id,
        filteredProducts: productsList.filter((each) => each.category === id),
      });
    }
  };

  fetchProductDetails = async () => {
    const productUrl = "http://localhost:5000/api/products";
    this.setState({
      status: statusMenu.inprogress,
    });
    const productResponse = await fetch(productUrl);
    const productData = await productResponse.json();
    if (productResponse.ok === true) {
      this.setState({
        productsList: productData,
        filteredProducts: productData,
        status: statusMenu.success,
      });
    } else {
      this.setState({
        status: statusMenu.failure,
      });
    }
  };

  renderView = () => {
    const { status } = this.state;
    switch (status) {
      case statusMenu.inprogress:
        return this.loadingView();
      case statusMenu.success:
        return this.SuccessView();
      default:
        return null;
    }
  };

  loadingView = () => {
    const { status } = this.state;
    const loading = status === statusMenu.inprogress;
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
          loading={loading}
          size={80}
          speedMultiplier={1}
        />
      </div>
    );
  };

  renderEmptyProductsView = () => (
    <div className="empty-products-container">
      <img
        className="empty-products-image"
        src="https://res.cloudinary.com/dyareetre/image/upload/v1751183061/Asset_1_1_uislqa.png"
        alt="no products to show"
      />
      <p className="empty-products-text">
        Your search did not find any matches
      </p>
    </div>
  );

  displayProductsListView = () => {
    const { filteredProducts, searchInput, wishList } = this.state;
    const finalProducts = filteredProducts.filter(
      (each) =>
        each.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    return finalProducts.map((eachItem) => (
      <li className="each-product" key={eachItem.id}>
        {eachItem.organic === 1 && (
          <div className="badge-container">Organic</div>
        )}
        <img
          src={eachItem.image_url}
          className="product-item-image"
          alt={eachItem.title}
        />
        <h3 className="product-item-title">{eachItem.title}</h3>
        <p className="product-category">{eachItem.category}</p>
        <p className="product-description">{eachItem.description}</p>
        <p className="product-price">
          <span className="price-text">Price: </span>
          {eachItem.price}
        </p>
        <div className="button-container">
          <button
            className="wishlist-btn"
            data-toggle="tooltip"
            data-placement="right"
            title="Add to Wishlist"
            onClick={() => {
              this.toggleItemstoWishlist(eachItem);
            }}
          >
            {wishList.some((item) => item.id === eachItem.id) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <Link to={`/product-details/${eachItem.id}`} className="product-link">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Know more
            </button>
          </Link>
        </div>
      </li>
    ));
  };

  SuccessView = () => {
    const { filteredProducts, searchInput, activeCategory } = this.state;
    const finalProducts = filteredProducts.filter(
      (each) =>
        each.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    const isFinalProductsEmpty = finalProducts.length === 0;
    return (
      <>
        <div className="categories-section">
          <div className="heading-search-section">
            <p className="featured-heading">Featured Categories</p>
            <div className="search-icon-section">
              <input
                className="search-section"
                placeholder="Search here..."
                type="search"
                onChange={this.updateSearchQuery}
              />
              <IoSearchOutline />
            </div>
          </div>
          <ul className="featured-categories-section">
            {filterMenu.map((eachCategory) => (
              <li
                key={eachCategory.id}
                className={`each-category ${eachCategory.id === activeCategory ? "active" : ""}`}
                onClick={() => {
                  this.changeActiveCetegory(eachCategory.id);
                }}
              >
                <img
                  className="category-thumbnail"
                  src={eachCategory.Thumbnail}
                  alt={`${eachCategory.id} logo`}
                />
                <p className="category-name">{eachCategory.displayText}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="top-picks-heading">Our Top Picks</p>
        <ul className="all-products-display-section">
          {isFinalProductsEmpty
            ? this.renderEmptyProductsView()
            : this.displayProductsListView()}
        </ul>
        <Footer />
      </>
    );
  };

  render() {
    return (
      <>
        <Header />
        <div className="all-products-bg-container">
          <div className="banners-section">
            <p className="vegan-store-all-products-title">Organic Feast</p>
            <p className="vegan-store-all-products-description">
              Farm-fresh, plant-based goods made ethically, delivered straight
              from field to home 🌱
            </p>
          </div>
          {this.renderView()}
        </div>
      </>
    );
  }
}
export default AllProducts;
