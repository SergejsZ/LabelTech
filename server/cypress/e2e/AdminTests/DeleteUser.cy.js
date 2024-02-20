/* ==== Test Created with Cypress Studio ==== */
it('Admin Deletes User Test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('[href="/admin/userManagement"] > .flex').click();
  cy.get(':nth-child(5) > .font-medium > .text-red-600 > .h-5 > path').click();
  /* ==== End Cypress Studio ==== */
});