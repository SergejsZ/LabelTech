/* ==== Test Created with Cypress Studio ==== */
it('Test for Admin Login', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/');
  cy.get('#id').clear('A');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  /* ==== End Cypress Studio ==== */
});