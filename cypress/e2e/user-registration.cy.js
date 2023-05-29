/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const randomEmail = faker.internet.email();

const base_URL = "http://ecommerce.test.k6.io/my-account/";

describe("User registration test suite", () => {
  beforeEach(() => {
    cy.visit(base_URL);
  });

  it("Succesfully register new user test", () => {
    cy.get("#reg_email").type(randomEmail);
    cy.get('button[name="register"]').click();
    cy.contains(
      `From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.`
    ).should("be.visible");
  });

  it("Try register with existing user test", () => {
    cy.get("#reg_email").type(randomEmail);
    cy.get('button[name="register"]').click();
    cy.contains("An account is already registered with your email address.").should('be.visible');
  });

  it("Try register with no email test", () => {
    cy.get("#reg_email").type(" ");
    cy.get('button[name="register"]').click();
    cy.contains("Error: Please provide a valid email address.").should('be.visible');
  });
});
