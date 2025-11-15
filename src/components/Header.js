import React from "react";
import { Button, ButtonToolbar, Label } from "react-bootstrap";

const Header = () => {
  const envName = process.env.REACT_APP_ENV_NAME || "Local";

  return (
    <div>
      <div className="container">
        <h2>React Tutorial - Product Management</h2>
        <ButtonToolbar>
          <Button bsStyle="info" href="./">
            Home
          </Button>
          <Button bsStyle="info" href="./products">
            List
          </Button>
          <Button bsStyle="info" href="./product">
            Create
          </Button>
          <h4><Label bsStyle="success" style={{ marginLeft: '10px', top: '-4px', position: 'relative' }}>{envName}</Label></h4>
          <h4>test 2</h4>
        </ButtonToolbar>
      </div>
      <hr />
    </div>
  );
};

export default Header;
