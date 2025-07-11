import { Component } from "react";
import { useParams } from "react-router-dom";
import { PuffLoader } from 'react-spinners'
import Header from '../Header';
import './index.css'
import { FaRupeeSign } from "react-icons/fa";
import { PiPottedPlant} from "react-icons/pi";

const withRouterParams = (Component) => {
  return function Wrapped(props) {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
};

const statusMenu = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

const productsImagesArray = {
    'Organic Bananas' : {
      images: ['/images/Banana/banana_01.jpg', '/images/Banana/banana_02.jpg', '/images/Banana/banana_03.jpg', '/images/Banana/banana_04.jpg', '/images/Banana/banana_05.jpg', '/images/Banana/banana_benefits.jpeg'],
      tags: ['Musa paradisiaca', 'Tropical', 'Instant']
    },
    'Alphonso Mangoes' : {
      images: ['/images/Mango/mango_01.jpg', '/images/Mango/mango_02.jpg', '/images/Mango/mango_03.jpg', '/images/Mango/mango_04.jpg', '/images/Mango/mango_05.jpg', '/images/Mango/mango_benefits.jpeg'],
      tags: ['Mangifera indica', 'Aroma', 'Creamy']
    },
    'Spinach Bunch' : {
      images: ['/images/Spinach/spinach_01.jpg', '/images/Spinach/spinach_02.jpg', '/images/Spinach/spinach_03.jpg', '/images/Spinach/spinach_04.jpg', '/images/Spinach/spinach_05.jpg', '/images/Spinach/spinach_benefits.jpeg'],
      tags: ['Spinacia oleracea', 'Gut Friendly', 'Flat']
    },
    'Cherry Tomatoes' : {
      images: ['/images/Tomato/tomato_01.jpg','/images/Tomato/tomato_02.jpg', '/images/Tomato/tomato_03.jpg', '/images/Tomato/tomato_04.jpg', '/images/Tomato/tomato_05.jpg', '/images/Tomato/tomato_benefits.jpeg'],
      tags: ['Solanum lycopersicum', 'Love Apple', 'Juicy']
    },
    'Tofu Blocks' : {
      images: ['/images/Tofu/tofu_01.jpg', '/images/Tofu/tofu_02.jpg', '/images/Tofu/tofu_03.jpg', '/images/Tofu/tofu_04.jpg', '/images/Tofu/tofu_05.jpg', '/images/Tofu/tofu_benefits.jpeg'],
      tags: ['Okara', 'Smoky', 'Smooth']
    },
    'Almond Milk (1L)' : {
      images: ['/images/Almond/almond_01.jpg', '/images/Almond/almond_02.jpg', '/images/Almond/almond_03.jpg', '/images/Almond/almond_04.jpg', '/images/Almond/almond_05.jpg', '/images/Almond/almond_venefits.jpeg'],
      tags: ['Amygdalate', 'Beverage', 'Blended']
    },
    'Organic Carrots' : {
      images: ['/images/Carrot/carrot_01.jpg', '/images/Carrot/carrot_02.jpg', '/images/Carrot/carrot_03.jpg', '/images/Carrot/carrot_04.jpg', '/images/Carrot/carrot_05.jpg', '/images/Carrot/carrot_benefits.jpg'],
      tags: ['Carota sativa', 'Juicy', 'Tender']
    },
    'Pumpkin Seeds' : {
      images: ['/images/Pumpkin/pumpkin_01.jpg', '/images/Pumpkin/pumpkin_02.jpg', '/images/Pumpkin/pumpkin_03.jpg', '/images/Pumpkin/pumpkin_04.jpg', '/images/Pumpkin/pumpkin_05.jpg', '/images/Pumpkin/pumpkin_benefits.jpg'],
      tags: ['Cucurbita pepo', 'Crunchy', 'Pepitas']
    },
}
const productHighlights = {
  "Organic Bananas": [
    "Rich in potassium and dietary fiber",
    "Naturally sweet and energy boosting",
    "Perfect for smoothies and snacking"
  ],
  "Alphonso Mangoes": [
    "Sweet and aromatic with creamy texture",
    "Sourced from premium Maharashtra orchards",
    "Ideal for desserts, shakes, and chutneys"
  ],
  "Spinach Bunch": [
    "High in iron, calcium, and vitamin K",
    "Freshly harvested and pesticide-free",
    "Perfect for sautés, soups, and salads"
  ],
  "Cherry Tomatoes": [
    "Juicy and naturally sweet",
    "Loaded with antioxidants and lycopene",
    "Great for roasting, salads, and snacking"
  ],
  "Tofu Blocks": [
    "High protein plant-based option",
    "Made from non-GMO soybeans",
    "Ideal for curries, stir-fries, and grills"
  ],
  "Almond Milk (1L)": [
    "100% vegan and dairy-free",
    "Rich in vitamin E and calcium",
    "Perfect for smoothies and baking"
  ],
  "Organic Carrots": [
    "Crunchy, sweet, and pesticide-free",
    "High in beta-carotene and fiber",
    "Great for juicing and roasting"
  ],
  "Pumpkin Seeds": [
    "Rich in magnesium and zinc",
    "Boosts immunity and heart health",
    "Perfect for snacking or topping oats"
  ],
  "Red Apples": [
    "Crisp and naturally sweet",
    "Packed with antioxidants and fiber",
    "Ideal for munching or baking pies"
  ],
  "Broccoli Florets": [
    "High in vitamin C and folate",
    "Steam-ready and nutrient dense",
    "Great for stir-fries and grain bowls"
  ],
  "Chickpeas (Dry)": [
    "High in protein and dietary fiber",
    "Essential for curries, hummus, and salads",
    "Heart-healthy and gluten-free"
  ],
  "Cashew Butter": [
    "Creamy and nutrient-rich spread",
    "Made from roasted organic cashews",
    "Perfect for toast, sauces, and smoothies"
  ],
  "Vegan Cheese Slices": [
    "Dairy-free, soy-based goodness",
    "Melts beautifully in sandwiches and wraps",
    "Rich in flavor and calcium"
  ],
  "Brown Rice (Organic)": [
    "Whole grain with nutty flavor",
    "Slow-digesting for sustained energy",
    "Great for stir-fries and buddha bowls"
  ],
  "Coconut Milk (400ml)": [
    "Extracted from fresh coconuts",
    "Adds creaminess to curries and desserts",
    "Naturally lactose-free and vegan-friendly"
  ]
};

class ProductDetails extends Component{
    state = {
        productDetails: {},
        status: statusMenu.initial,
        quantity: 1
    }

    componentDidMount(){
        this.fetchProductDetails();
    }

    fetchProductDetails = async () => {
        const { id } = this.props.params;
        const productDetailsUrl = `http://localhost:5000/api/products/${id}`;
        this.setState({
            status: statusMenu.inprogress,
        })
        const productDetailsResponse = await fetch(productDetailsUrl);
        const productDetailsData = await productDetailsResponse.json();
        if (productDetailsResponse.ok === true){
            this.setState({
                status: statusMenu.success,
                productDetails: productDetailsData
            })
        }
        else{
            this.setState({
                status: statusMenu.failure
            })
        }
        
    }

    productDetailsRenderView = () => {
    const {status} = this.state
    switch(status){
      case statusMenu.inprogress:
        return this.loadingView()
      case statusMenu.success:
        return this.SuccessView() 
      default:
        return null   
    }
  }

  SuccessView = () => {
    const {productDetails, quantity} = this.state
    const title = productDetails.title
    const productDesc = productsImagesArray[title]
    const highLights = productHighlights[title]
    const Images = productDesc['images']
    const Tags = productDesc['tags']
    return(
        <div className="product-details-bg-container">
            <div className="product-details-top-main-section">
              <div className="top-images-section">
                <img className="top-main-image" src={`/${productDetails.image_url}`} alt={productDetails.title} />
                <div className="top-sub-images-section">
                  <img className="top-sub-image" src={Images[0]} alt={productDetails.title} />
                  <img className="top-sub-image" src={Images[1]} alt={productDetails.title} />
                </div>
              </div>
              <div className="product-details-description-section">
                <h1 className="product-details-title">{productDetails.title}</h1>
                <p className="product-details-price"><FaRupeeSign /> {productDetails.price}</p>
                <p className="product-details-description">{productDetails.description}</p>
                <div className="action-bar">
                  <div className="quantity-selector">
                    <button type="button">−</button>
                    <span>{quantity}</span>
                    <button type="button">+</button>
                  </div>
                  <button type="button" className="add-to-cart-btn">Add to Cart</button>
                </div>
                <p className="product-details-more-description">Each product is freshly made using locally sourced, plant-based ingredients—ensuring optimal nutrition, 
                  flavor, and sustainability in every bite. Pure, cruelty-free, and naturally wholesome goodness.</p>
                <ul className="tags-ul-container">
                  {Tags.map(eachTag => (
                    <li key={eachTag} className="tag-list-item"><PiPottedPlant color="green" size="30px" /> {eachTag}</li>
                  ))}
                </ul> 
                <div className="products-highlights-section">
                  <p className="highlights-heading">Product Highlights</p>
                  <ul className="highlights-ul-container">
                    {highLights.map(eachHighlight => (
                      <li className="highlight-list-item">✅ {eachHighlight}</li>
                    ))}
                  </ul>
                </div> 
              </div>
            </div>
        </div>
    )
  }

  loadingView = () => {
    const {status} = this.state
    const loading = status === statusMenu.inprogress
    const styles = {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px', 
      },
    };

    return(
      <div style={styles.wrapper}>
        <PuffLoader
          color="#a8e6cf"
          loading={loading}
          size={80}
          speedMultiplier={1}
        />
    </div>
  )}

    render(){
        return(
            <>
            <Header />
            {this.productDetailsRenderView()}
            </>
        )
    }
}
export default withRouterParams(ProductDetails);