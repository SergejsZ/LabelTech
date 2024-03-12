/* ==== Test Created with Cypress Studio ==== */
it('Not working Add Product', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear();
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.bg-blue-500 > .text-2xl').click();
  cy.get('#productCode').clear('18S637W');
  cy.get('#productCode').type('18S637W');
  cy.get('#productName').clear('Baby Mushrooms');
  cy.get('#productName').type('Baby Mushrooms');
  cy.get('#productWeight').clear('200g');
  cy.get('#productWeight').type('200g');
  cy.get('#productCustomerID').select('1');
  cy.get(':nth-child(5) > .bg-gray-200').click();
  cy.get(':nth-child(5) > .bg-gray-200').click();
  cy.get('#productUrl').click();
  cy.get('.bg-blue-600').click();
  cy.get('.space-y-6 > :nth-child(5)').click();
  cy.get(':nth-child(5) > .bg-gray-200').click();
  cy.get('#productUrl').click();
  /* ==== End Cypress Studio ==== */
});