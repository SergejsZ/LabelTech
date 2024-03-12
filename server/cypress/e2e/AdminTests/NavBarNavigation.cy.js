/* ==== Test Created with Cypress Studio ==== */
it('Navigating Nav Bar', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.mr-4 > .mt-2 > [placeholder=""] > .flex').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(2) > .flex').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(3) > .flex').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(4) > .flex').click();
  cy.get('.w-12').click();
  cy.get('.space-x-4 > .block').click();
  cy.get('.mr-4 > .mt-2 > [placeholder=""]').click();
  cy.get('.mr-4 > .mt-2 > [placeholder=""] > .flex').click();
  /* ==== End Cypress Studio ==== */
});