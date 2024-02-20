/* ==== Test Created with Cypress Studio ==== */
it('Admin Editing User Test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('[href="/admin/userManagement"] > .flex').click();
  cy.get(':nth-child(1) > .font-medium > .text-indigo-600 > .h-5 > path').click();
  cy.get('#userName').clear('Ale');
  cy.get('#userName').type('Steve');
  cy.get('#userLevel').select('Admin');
  cy.get('.shadow-xl').click();
  cy.get('#userEmail').clear();
  cy.get('#userEmail').type('steve@gmail.com');
  cy.get('.bg-blue-600').click();
  /* ==== End Cypress Studio ==== */
});