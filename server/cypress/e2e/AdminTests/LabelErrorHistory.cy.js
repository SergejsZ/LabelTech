/* ==== Test Created with Cypress Studio ==== */
it('Download Label Error History', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('Admin');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(4) > .flex').click();
  cy.get('.bg-green-700').click();
  /* ==== End Cypress Studio ==== */
});