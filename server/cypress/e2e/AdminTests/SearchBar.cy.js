/* ==== Test Created with Cypress Studio ==== */
it('Search Bar Test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('Admin');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.peer').clear('c');
  cy.get('.peer').type('chestnut');
  cy.get(':nth-child(1) > :nth-child(1) > .max-w-sm > .justify-center > .w-64').click();
  cy.get(':nth-child(2) > :nth-child(1) > .max-w-sm > .justify-center > .w-64').click();
  cy.get('.peer').clear('chestnu');
  /* ==== End Cypress Studio ==== */
});