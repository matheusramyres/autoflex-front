describe('Product Materials', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should expand product and show materials', () => {
    cy.get('table tbody tr').first().find('button').first().click();

    cy.contains('Materiais de Composição').should('exist');
  });

  it('should add material to product', () => {
    cy.get('table tbody tr').first().find('button').first().click();

    cy.contains('Add Material').click();

    cy.get('select').select(1);
    cy.get('input[type="number"]').clear().type('3');

    cy.contains('Salvar').click();

    cy.get('table').contains('3').should('exist');
  });

  it('should remove material from product', () => {
    cy.get('table tbody tr').first().find('button').first().click();

    cy.get('button[title="Delete"]').first().click();

    cy.contains('Nenhum material adicionado').should('exist');
  });
});
