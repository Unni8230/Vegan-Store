import { Component } from "react";
import {Link} from 'react-router-dom'
import Slider from "react-slick";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

class Home extends Component {
  state={
    productsList: []
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails = async () => {
    const productUrl = "http://localhost:5000/api/products";
    const productResponse = await fetch(productUrl);
    const productData = await productResponse.json();
    if (productResponse.ok === true){
      this.setState({
        productsList: productData
      })
    }
  };

  render() {
    const {productsList} = this.state
    var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    initialSlide: 0,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 824,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="banner-section">
            <p className="vegan-store-title">Vegan Store</p>
            <p className="vegan-store-moto">Earth's Best, Delivered Fresh</p>
            <p className="vegan-store-moto-description">
              Nutrition is the source of the development of tissues and cells,
              their constant renewal, the saturation of man with energy.
            </p>
          </div>
          <div id="section-1 ">
            <div className="flex">
              <div id="flex-1" className="flex-item">
                <i class="fa-solid fa-carrot"></i>
                <h3>Pure</h3>
                <p>
                  Vegetables are an integral part of the human diet. They are
                  extremely useful because of the nutrients and other benefits.
                </p>
              </div>
              <div id="flex-2" className="flex-item">
                <i className="fa-solid fa-seedling"></i>
                <h3>Local</h3>
                <p>
                  Fresh tomatoes are ideal for replenishing the loss of
                  minerals which contains a lot of acids that our
                  body need.
                </p>
              </div>
              <div id="flex-3" className="flex-item">
                <i className="fa-solid fa-lemon"></i>
                <h3>Fresh</h3>
                <p>
                  In the content of vitamin C, sweet peppers are superior to
                  lemons and even black currants which is usually cut during cleaning.
                </p>
              </div>
              <div id="flex-4" className="flex-item">
                <i className="fa-solid fa-heart"></i>
                <h3>Healthy</h3>
                <p>
                  If you sometimes eat hot chili peppers, this will help
                  normalize cerebral circulation with
                  bronchial asthma, cough, sore throat, flu.
                </p>
              </div>
            </div>
          </div>
          <div className="slider-container">
            <div className="explore-more-container">
              <p className="some-vegan-products-text">Handpicked Freshness</p>
              <Link to='/all-products'>
                <button type="button" className="ripple-btn">Explore More</button>
              </Link>
            </div>
            <Slider {...settings}>
              {productsList.map(eachProduct => (
                <Link to={`/product-details/${eachProduct.id}`} className="product-home-link">
                <div className="product-slide" key={eachProduct.id}>
                  <img src={eachProduct.image_url} alt={eachProduct.title} className="product-image" />
                  <h3 className="product-title">{eachProduct.title}</h3>
                  <p className="product-desc"><span className="price-label">Price: ₹{eachProduct.price}</span></p>
                  <p className="product-desc">{eachProduct.description}</p>
                </div>
              </Link>

              ))}
            </Slider>
          </div>
          <Footer />
        </div>
        
      </>
    );
  }
}
export default Home;
