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
      product: this.getEmptyProduct(),
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
      this.loadProduct(pId);
    }
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.router.params.id;
    const currentId = this.props.router.params.id;

    // Only update state if the product ID changed
    if (prevId !== currentId) {
      if (currentId) {
        this.loadProduct(currentId);
      } else {
        // Reset form for new product
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          product: this.getEmptyProduct(),
          isnew: true,
          hasError: false,
          error: {},
        });
      }
    }
  }

  getEmptyProduct() {
    return {
      id: "0",
      productName: "",
      price: "",
      image: process.env.API_URL + "/images/default.png",
    };
  }

  loadProduct(pId) {
    if (!pId) return;

    productApi
      .getProduct(pId)
      .then((product) => this.setState({ product, isnew: false }))
      .catch((error) => this.handleError(error));
  }

  updateProductState(event) {
    if (!event?.target) return;

    const field = event.target.name;
    const value = event.target.value;

    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        [field]: value,
      },
    }));
  }

  handleImageChange(image) {
    this.setState((prevState) => ({
      product: { ...prevState.product, image },
      hasError: false,
      error: null,
    }));
  }

  handleSave(event) {
    event.preventDefault();
    const { product, isnew } = this.state;
    const navigate = this.props.router.navigate;

    const saveOperation = isnew
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
