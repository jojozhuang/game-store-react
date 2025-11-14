import React from "react";
import { Button, ButtonToolbar, Label } from "react-bootstrap";

const Header = () => {
  const labelText = process.env.REACT_APP_LABEL_TEXT || "Local";

  return (
    <div>
      <div className="container">
        <h2>React Tutorial - Product Management</h2>
        <ButtonToolbar>
          <Button bsStyle="info" href="/">
            Home
          </Button>
          <Button bsStyle="info" href="/products">
            List
          </Button>
          <Button bsStyle="info" href="/product">
            Create
          </Button>
          <Label bsStyle="success" style={{ marginLeft: '10px', top: '5px', position: 'relative'}}>Local</Label>
        </ButtonToolbar>
      </div>
      <hr />
    </div>
  )
};

export default Header;
