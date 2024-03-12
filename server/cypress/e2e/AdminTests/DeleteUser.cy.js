/* ==== Test Created with Cypress Studio ==== */
it('Admin deleting User', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('A');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(3) > .flex').click();
  cy.get(':nth-child(6) > .font-medium > .text-red-600 > .h-6 > path').click();
  /* ==== End Cypress Studio ==== */
});