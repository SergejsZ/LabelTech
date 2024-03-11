/* ==== Test Created with Cypress Studio ==== */
it('ExportErrorData', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('QualityControl');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  /* ==== End Cypress Studio ==== */
});