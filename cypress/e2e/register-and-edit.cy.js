/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const randomEmail = faker.internet.email();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const newUserName = faker.internet.userName();

const base_URL = "http://ecommerce.test.k6.io/my-account/";

describe("Edit user registration test suite", () => {
  beforeEach(() => {
    cy.visit(base_URL);
  });

  it("Succesfully edit username test", () => {
    cy.get("#reg_email").type(randomEmail);
    cy.get('button[name="register"]').click();
    cy.contains(
      `From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.`
    ).should("be.visible");
    cy.contains("edit your password and account details").click();
    cy.get("#account_first_name").type(firstName);
    cy.get("#account_last_name").type(lastName);
    cy.get("#account_display_name").clear();
    cy.get("#account_display_name").type(newUserName);
    cy.get("button").contains("Save changes").click();
    cy.contains("Account details changed successfully.").should("be.visible");
  });
});
