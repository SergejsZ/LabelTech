/* ==== Test Created with Cypress Studio ==== */
it('Admin adding user', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('A');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(3) > .flex').click();
  cy.get('.flex > .mb-4').click();
  cy.get('#userName').clear('te');
  cy.get('#userName').type('test');
  cy.get('#userEmail').clear('t');
  cy.get('#userEmail').type('test@gmail.com');
  cy.get('#userPassword').clear('P');
  cy.get('#userPassword').type('Password123!');
  cy.get('#userLevel').select('Leader');
  cy.get('.bg-blue-600').click();
  /* ==== End Cypress Studio ==== */
});