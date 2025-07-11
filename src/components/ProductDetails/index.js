import { Component } from "react";
import { useParams } from "react-router-dom";

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

const productsDetailsArray = [
    
]

class ProductDetails extends Component{
    status = {
        status: statusMenu.initial,
        productDetails: {},
    }

    componentDidMount(){
        this.fetchProductDetails()
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
    const {productDetails} = this.state
    return(
        <div className="product-details-bg-container">
            <div className="product-details-top-main-section">

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
            {this.productDetailsRenderView}
            </>
        )
    }
}
export default withRouterParams(ProductDetails);