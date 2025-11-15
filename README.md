[![Build Status](https://dev.azure.com/jojozhuang0911/portfolios/_apis/build/status%2Fjojozhuang.game-store-react?branchName=refs%2Fpull%2F43%2Fmerge)](https://dev.azure.com/jojozhuang0911/portfolios/_build/latest?definitionId=3&branchName=refs%2Fpull%2F43%2Fmerge) [![Netlify Status](https://api.netlify.com/api/v1/badges/a72886eb-91f2-4d28-8d50-38bd4c9d34d7/deploy-status)](https://app.netlify.com/projects/game-store-react/deploys)

# Game Store

A web app for managing products, built with React and RESTful API.

<kbd>![image](/public/assets/products.png)</kbd>

# Function

This application is used to manage products. It implements all CRUD operations. Below are the available features.

- Product List - Show all products in a list with Edit and Delete button.
- Product Management - Create, update and delete product.
- Image Upload - Set image for product and upload to server.
- Dynamic Data - All data is fetched from backend RESTful services.

# Demo

Two available demos:

- `Live Demo on Netlify(CI):` <a href="https://game-store-react.netlify.app/" target="\_blank">https://game-store-react.netlify.app/</a>
- `Live Demo on Render(CI):` <a href="https://game-store-react.onrender.com/" target="\_blank">https://game-store-react.onrender.com/</a>
- `Live Demo on Azure:` <a href="https://game-store-react.azurewebsites.net/" target="\_blank">https://game-store-react.azurewebsites.net/</a>

_Note: The demo websites may be slow when you access them for the first time. Be patient!_

# Setup Locally

## 1. RESTful API

Setup server to host RESTful API with Spring Boot or ASP.NET Core, see below.

- https://github.com/jojozhuang/game-store-springboot
- https://github.com/jojozhuang/restful-api-springboot
- https://github.com/jojozhuang/restful-api-aspnet

## 2. React App

Clone the git repo and start it locally. Run with node version `v20.19.5`.

```bash
git clone https://github.com/jojozhuang/game-store-react.git
cd game-store-react
npm install
npm run dev
```

Access http://localhost:12090/ in web browser, enjoy!

# Deployment

Read tutorial [Deploying Game Store React App to Netlify](https://jojozhuang.github.io/tutorial/deploying-game-store-react-app-to-netlify) to learn how this react app is deployed to Netlify.

# Portfolio

Read portfolio [Game Store(React)](https://jojozhuang.github.io/project/game-store-react) to learn the main functions of this React app.

# Tutorial

Read tutorial [Building Web Application with React](https://jojozhuang.github.io/tutorial/building-web-application-with-react) to learn how this React app is built.
