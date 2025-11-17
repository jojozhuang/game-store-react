/// <reference types="cypress" />

describe('Product List', () => {
  const delay = 1000; // 1 second

  beforeEach(() => {
    cy.visit('/products');
    cy.wait(delay); // wait 1 second before running each test
  });

  it('should display the app name on the product list page', () => {
    cy.contains('React Tutorial - Product Management');
    cy.get('.container > p').should('contain.text', 'Data from Restful API');
  });

  it('should navigate to home page', () => {
     cy.get('a[href="/"]').click();
    cy.get('h1').should('contain.text', 'Game Store - Product Management');
  });

  it('should navigate to product add page', () => {
     cy.get('a[href="/product"]').click();
    cy.get('.container > h2').should('contain.text', 'Create New Product');
  });
});
