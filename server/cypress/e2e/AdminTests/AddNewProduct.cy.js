/* ==== Test Created with Cypress Studio ==== */
it('Add new product Test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.bg-blue-500 > .text-2xl').click();
  cy.get('#productCode').clear('1');
  cy.get('#productCode').type('18S637W');
  cy.get('#productName').clear('B');
  cy.get('#productName').type('Baby Mushrooms');
  cy.get('#productWeight').clear('2');
  cy.get('#productWeight').type('200g');
  cy.get('#productCustomerID').select('2');
  cy.get('.bg-blue-600').click();
  /* ==== End Cypress Studio ==== */
});