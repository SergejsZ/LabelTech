/* ==== Test Created with Cypress Studio ==== */
it('Edit User', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('Admin');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(3) > .flex').click();
  cy.get(':nth-child(4) > .font-medium > .text-blue-500 > .h-5').click();
  cy.get('#userName').clear('test1');
  cy.get('#userName').type('test123');
  cy.get('#userEmail').click();
  cy.get('#userLevel').select('Quality');
  cy.get('.bg-blue-600').click();
  /* ==== End Cypress Studio ==== */
});