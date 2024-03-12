/* ==== Test Created with Cypress Studio ==== */
it('Test Calender for error history', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('#id').clear('Admin');
  cy.get('#id').type('Admin');
  cy.get('#password').clear('P');
  cy.get('#password').type('Password123!');
  cy.get('form > .flex > .w-full').click();
  cy.get('.gap-4').click();
  cy.get('.mr-4 > .mt-2 > :nth-child(4) > .flex').click();
  cy.get(':nth-child(20)').click();
  cy.get(':nth-child(17)').click();
  cy.get('.react-calendar__navigation__next-button').click();
  cy.get('.react-calendar__navigation__label__labelText').click();
  cy.get('.react-calendar__year-view__months > :nth-child(5)').click();
  cy.get('.react-calendar__month-view__days > :nth-child(4)').click();
  /* ==== End Cypress Studio ==== */
});