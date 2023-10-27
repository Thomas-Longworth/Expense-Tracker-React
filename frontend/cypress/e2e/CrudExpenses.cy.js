describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/expense-full-stack/')
    cy.wait(4000)
    
    
    cy.get('[data-cy = "epenses-button"]').click()

    cy.get('[data-cy = "title-input"]').type("New watch")
    cy.get('[data-cy = "cost-input"]').type(300)
    cy.get('[data-cy = "submit-expense"]').click()
    cy.wait(3000)

   
    
    
    
  })
 



  //Click enter expense button

  //add expense title and cost 

  // submit

  //check if displayed 

  //


})