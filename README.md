# Game Store
A web app for managing products, built with React and RESTful API.

<kbd>![image](/public/assets/productlist.png)</kbd>

# Function
This application is used to manage products. It implements all CRUD operations. Below are the available features.
* Product List - Show all products in a list with Edit and Delete button.
* Product Management - Create, update and delete product.
* Image Upload - Set image for product and upload to server.
* Dynamic Data - All data is fetched from backend RESTful services.

# Demo
Two available demos:
* `Live Demo on Netlify(CI):` <a href="https://game-store-react.netlify.com/" target="\_blank">https://game-store-react.netlify.com/</a>
* `Live Demo on Heroku(CI):` <a href="https://game-store-react.herokuapp.com/" target="\_blank">https://game-store-react.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://game-store-react.azurewebsites.net/" target="\_blank">https://game-store-react.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

# Setup Locally
## 1. RESTful API
Setup server to host RESTful API with Spring Boot or ASP.NET Core, see below.
* https://github.com/jojozhuang/restful-api-springboot
* https://github.com/jojozhuang/restful-api-aspnet

## 2. React App
```bash
git clone https://github.com/jojozhuang/game-store-react.git
cd game-store-react
npm install
npm start
```
Access http://localhost:12090/ in web browser, enjoy!

# Deployment
Read tutorial [Deploying Game Store React App to Netlify](https://jojozhuang.github.io/tutorial/deploying-game-store-react-app-to-netlify) to learn how this react app is deployed to Netlify.

# Portfolio
Read portfolio [Game Store(React)](https://jojozhuang.github.io/project/game-store-react) to learn the main functions of this React app.

# Tutorial
Read tutorial [Building Web Application with React](https://jojozhuang.github.io/tutorial/building-web-application-with-react) to learn how this React app is built.
