import {Component} from 'react'
import Header from '../Header';
import './index.css'

class AllProducts extends Component{
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
    render(){
        const {productsList} = this.state
        return(
            <>
                <Header />
                <div className='all-products-bg-container'>
                    <div className="banners-section">
                        <p className="vegan-store-title">Vegan Store</p>
                        <p className="vegan-store-moto">Earth's Best, Delivered Fresh</p>
                        <p className="vegan-store-moto-description">
                        Nutrition is the source of the development of tissues and cells,
                        their constant renewal, the saturation of man with energy.
                        </p>
                    </div>
                    <ul className='all-products-display-section'>
                        {productsList.map(eachItem => (
                            <li className='each-product' key={eachItem.id}>
                                <img src={eachItem.image_url} className='product-item-image' alt={eachItem.title} />
                                <h3 className='product-item-title'>{eachItem.title}</h3>
                                <p className='product-category'>{eachItem.category}</p>
                                <p className='product-description'>{eachItem.description}</p>
                                <p className='product-price'><span className='price-text'>Price: </span>{eachItem.price}</p>
                                <button type="button" className='btn btn-info know-more-button'>Know more</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}
export default AllProducts