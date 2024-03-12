/* ==== Test Created with Cypress Studio ==== */
it('Line leader starting line', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('Leader');
  cy.get('#id').type('Leader');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('#productCode').select('789');
  cy.get('#dispatchDate').clear('0020-03-15');
  cy.get('#dispatchDate').type('2024-03-15');
  cy.get('.mr-3 > .flex').click();
  cy.get('.mr-3 > .flex > .bg-blue-500').click();
  cy.get('.mt-16 > .px-4').click();
  cy.get('.mt-16 > .px-4').click();
  /* ==== End Cypress Studio ==== */
});