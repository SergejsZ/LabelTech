/* ==== Test Created with Cypress Studio ==== */
it('Login Test for Line Leader', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('L');
  cy.get('#id').type('Leader');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  /* ==== End Cypress Studio ==== */
});