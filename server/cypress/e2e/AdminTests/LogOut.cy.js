/* ==== Test Created with Cypress Studio ==== */
it('Log Out', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('Admin');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.backdrop-saturate-200 > .justify-between').click();
  cy.get('.gap-4 > .gap-x-1 > a > .align-middle > span').click();
  /* ==== End Cypress Studio ==== */
});