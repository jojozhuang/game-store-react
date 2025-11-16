import React from "react";
import PropTypes from "prop-types";
import AlertSimple from "../controls/AlertSimple";
import ProductForm from "./ProductForm";
import productApi from "../../api/ProductsApi";
import { withRouter } from "../../utils/withRouter";

class Product extends React.Component {
  constructor(props) {
    super(props);

    const pId = this.props.router.params.id;

    this.state = {
      hasError: false,
      error: {},
      product: {
        id: "0",
        productName: "",
        price: "",
        image: process.env.API_URL + "/images/default.png",
      },
      isnew: !pId,
    };

    this.updateProductState = this.updateProductState.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const pId = this.props.router.params.id;

    if (pId) {
      productApi
        .getProduct(pId)
        .then((product) => {
          this.setState({ product });
        })
        .catch((error) => {
          this.handleError(error);
        });
    }
  }

  updateProductState(event) {
    const field = event.target.name;
    const product = { ...this.state.product };
    product[field] = event.target.value;
    this.setState({ product });
  }

  handleImageChange(image) {
    this.setState({
      hasError: false,
      error: null,
      product: { ...this.state.product, image }
    });
  }

  handleSave(event) {
    event.preventDefault();

    const product = this.state.product;
    const navigate = this.props.router.navigate;

    const saveOperation = this.state.isnew
      ? productApi.createProduct(product)
      : productApi.updateProduct(product);

    saveOperation
      .then(() => navigate("/products"))
      .catch((error) => this.handleError(error));
  }

  handleError(error) {
    this.setState({ error, hasError: true });
  }

  render() {
    const { hasError, error, isnew, product } = this.state;

    return (
      <div className="container">
        <h2>{isnew ? "Create New Product" : "Edit Product"}</h2>

        {hasError && <AlertSimple error={error} />}

        <ProductForm
          product={product}
          isnew={isnew}
          onChange={this.updateProductState}
          onImageChange={this.handleImageChange}
          onSave={this.handleSave}
          onError={this.handleError}
        />
      </div>
    );
  }
}

Product.propTypes = {
  router: PropTypes.shape({
    params: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(Product);
