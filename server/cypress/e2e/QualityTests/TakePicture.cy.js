/* ==== Test Created with Cypress Studio ==== */
it('TakePicture', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/');
  cy.get('#id').clear('Q');
  cy.get('#id').type('QualityControl');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  /* ==== End Cypress Studio ==== */
});