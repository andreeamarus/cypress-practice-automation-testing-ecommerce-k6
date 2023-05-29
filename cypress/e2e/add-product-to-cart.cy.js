/// <reference types="cypress" />

import { faker } from "@faker-js/faker";


const email = faker.internet.email();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const companyName=faker.company.name();
const street=faker.location.streetAddress();
const city = faker.location.city();
const postCode=faker.location.zipCode();
const phone=faker.phone.number('####-###-###');


const base_URL = "http://ecommerce.test.k6.io/";
describe("Add product to cart test suite", () => {
    beforeEach(() => {
      cy.visit(base_URL);
    });

it('Add product to cart test', () => {
    cy.intercept({
        method: "POST",
        url: "http://ecommerce.test.k6.io/?wc-ajax=add_to_cart",
      }).as("addProductAPI");

    cy.intercept({
        method: "POST",
        url: "http://ecommerce.test.k6.io/?wc-ajax=checkout",
      }).as("placeOrderAPI");
  
    cy.get("a[href='?add-to-cart=33']").click();
    cy.wait("@addProductAPI").its("response.statusCode").should("eq", 200);
    cy.get("a[href='http://ecommerce.test.k6.io/cart/']").contains("Cart").click();
    cy.get("a[href='http://ecommerce.test.k6.io/checkout/']").contains("Checkout").click();
    cy.get("#billing_first_name").type(firstName);
    cy.get("#billing_last_name").type(lastName);
    cy.get("input[name='billing_company']").type(companyName);
    cy.get("#billing_state_field select"); 
    cy.get('input[name="billing_city"]').type(city);
    cy.get('#billing_address_1').type(street);
    cy.get('#billing_postcode').type(postCode);
    cy.get('#billing_phone').type(phone);
    cy.get('#billing_email').type(email);
    cy.get('#place_order').click();
    cy.wait("@placeOrderAPI").its("response.statusCode").should("eq", 200);
    cy.contains("Thank you. Your order has been received.").should("be.visible");

});
});