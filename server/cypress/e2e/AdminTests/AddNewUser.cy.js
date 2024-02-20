/* ==== Test Created with Cypress Studio ==== */
it('Admin Adding new user Test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('A');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('[href="/admin/userManagement"] > .flex').click();
  cy.get('.mb-4').click();
  cy.get('#userName').clear('D');
  cy.get('#userName').type('David');
  cy.get('#userEmail').clear('D');
  cy.get('#userEmail').type('David@gmail.com');
  cy.get('#userPassword').clear('P');
  cy.get('#userPassword').type('Password123!');
  cy.get('#userLevel').select('Leader');
  cy.get('.bg-blue-600').click();
  cy.get('.w-full > .bg-white > :nth-child(1) > :nth-child(2)').click();
  /* ==== End Cypress Studio ==== */
});