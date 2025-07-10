import {Component} from 'react'
import { PuffLoader } from 'react-spinners'
import Header from '../Header';
import { IoSearchOutline } from "react-icons/io5";
import './index.css'

const filterMenu = [
  {id: 'All', displayText: 'All', Thumbnail: '/images/Filter/All_thumb.jpg'},
  {id: 'Fruits', displayText: 'Fruits', Thumbnail: '/images/Filter/Fruits_thumb.jpg'},
  {id: 'Vegetables',displayText: 'Vegetables', Thumbnail: '/images/Filter/Veg_thumb.jpg'},
  {id: 'Leafy Greens', displayText: 'Leaves', Thumbnail: '/images/Filter/Leafy_thumb.jpg'},
  {id: 'Vegan Groceries', displayText: 'Groceries', Thumbnail: '/images/Filter/VeganGroceries.jpg'},
  {id: 'Nuts & Seeds', displayText: 'Nuts', Thumbnail: '/images/Filter/Nuts_thumb.jpg'},
  {id: 'Pantry Staples',displayText: 'Pantries', Thumbnail: '/images/Filter/Pantries_thumb.jpg'}
]

const statusMenu = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

class AllProducts extends Component{
    state={
    productsList: [],
    filteredProducts: [],
    activeCategory: 'All',
    searchInput: '',
    status: statusMenu.initial
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  updateSearchQuery = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  changeActiveCetegory = id => {
    const {productsList} = this.state
    if (id==='All'){
      this.setState({
        activeCategory: id,
        filteredProducts: productsList,
      })
    }
    else{
      this.setState({
      activeCategory: id,
      filteredProducts: productsList.filter(each => each.category === id)
    })
    }
  }

  fetchProductDetails = async () => {
    const productUrl = "http://localhost:5000/api/products";
    this.setState({
      status: statusMenu.inprogress,
    })
    const productResponse = await fetch(productUrl);
    const productData = await productResponse.json();
    if (productResponse.ok === true){
      this.setState({
        productsList: productData,
        filteredProducts: productData,
        status: statusMenu.success
      })
    }
    else{
      this.setState({
        status: statusMenu.failure
      })
    }
  };

  renderView = () => {
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

  loadingView = () => {
    const {status} = this.state
    const loading = status === statusMenu.inprogress
    const styles = {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px', // Adjust based on layout
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

  SuccessView  =() => {
    const {filteredProducts, searchInput} = this.state
    const finalProducts = filteredProducts.filter(each => each.title.toLowerCase().includes(searchInput.toLowerCase()))
    return(
      <>
      <div className='categories-section'>
        <div className='heading-search-section'>
          <p className='featured-heading'>Featured Categories</p>
          <div className='search-icon-section'>
          <input className='search-section' type='search' onChange={this.updateSearchQuery} />
          <IoSearchOutline />
          </div>
        </div>
        <ul className='featured-categories-section'>
          {filterMenu.map(eachCategory => (
            <li key={eachCategory.id} className='each-category' onClick={()=> {this.changeActiveCetegory(eachCategory.id)}}>
              <img className='category-thumbnail' src={eachCategory.Thumbnail} alt={`${eachCategory.id} logo`}/>
              <p className='category-name'>{eachCategory.displayText}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className='top-picks-heading'>Our Top Picks</p>
      <ul className='all-products-display-section'>
        {finalProducts.map(eachItem => (
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
      </>
    )
  }

    render(){
        return(
            <>
                <Header />
                <div className='all-products-bg-container'>
                    <div className="banners-section">
                        <p className="vegan-store-all-products-title">Organic Feast</p>
                        <p className="vegan-store-all-products-description">
                        Farm-fresh, plant-based goods made ethically, delivered straight from field to home 🌱
                        </p>
                    </div>
                    {this.renderView()}
                </div>
            </>
        )
    }
}
export default AllProducts