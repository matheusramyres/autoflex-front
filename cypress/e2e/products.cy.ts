describe('Products flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Produtos').click();
  });

  it('should list products', () => {
    cy.contains('Produtos').should('exist');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('should create a product', () => {
    cy.contains('Add Produto').click();

    cy.get('input[placeholder="Insira o nome do produto"]').type(
      'Produto Cypress',
    );

    cy.get('input[placeholder="0.00"]').clear().type('199.99');

    cy.contains('Salvar').click();

    cy.contains('Produto Cypress').should('exist');
  });

  //   it('should edit a product', () => {
  //     cy.contains('Produto Cypress')
  //       .parents('tr')
  //       .find('button[title="Edit"]')
  //       .click();

  //     cy.get('input').first().clear().type('Produto Cypress Editado');

  //     cy.contains('Save').click();

  //     cy.contains('Produto Cypress Editado').should('exist');
  //   });

  //   it('should delete a product', () => {
  //     cy.contains('Produto Cypress Editado')
  //       .parents('tr')
  //       .find('button[title="Delete"]')
  //       .click();

  //     cy.contains('Produto Cypress Editado').should('not.exist');
  //   });
});
