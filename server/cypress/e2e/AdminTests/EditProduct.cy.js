/* ==== Test Created with Cypress Studio ==== */
it('Edit Mushrooms', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get(':nth-child(5) > :nth-child(1) > .max-w-sm > .py-4 > .flex > .space-x-2 > .text-blue-500 > .h-5').click();
  cy.get('#productWeight').clear('15');
  cy.get('#productWeight').type('200');
  cy.get(':nth-child(5) > .block').click();
  cy.get('.bg-blue-600').click();
  cy.get('.bg-blue-600').click();
  cy.get('.bg-gray-600').click();
  /* ==== End Cypress Studio ==== */
});