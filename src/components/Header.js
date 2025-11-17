import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, ButtonToolbar, Label } from "react-bootstrap";

const Header = () => {
  const envName = process.env.REACT_APP_ENV_NAME || "Local";

  return (
    <div>
      <div className="container">
        <h2>React Tutorial - Product Management</h2>
        <ButtonToolbar>
          <LinkContainer to="/">
            <Button bsStyle="info">Home</Button>
          </LinkContainer>

          <LinkContainer to="/products">
            <Button bsStyle="info">List</Button>
          </LinkContainer>

          <LinkContainer to="/product">
            <Button bsStyle="info">Create</Button>
          </LinkContainer>
           <h4><Label bsStyle="success" style={{ marginLeft: '10px', top: '-4px', position: 'relative' }}>{envName}</Label></h4>
        </ButtonToolbar>
      </div>
      <hr />
      <h3>Test 1</h3>
    </div>
  );
};

export default Header;
