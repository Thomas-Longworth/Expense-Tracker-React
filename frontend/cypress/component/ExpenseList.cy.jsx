import React from 'react'
import ExpenseList from '../../src/components/ExpenseList'
import "bootstrap/dist/css/bootstrap.min.css";
import { LoadingContext } from '../../src/contexts/LoadingContext'
import { ExpensesContext } from '../../src/contexts/ExpensesContext'
import { mount } from 'cypress/react'
it('mounts', () => {
  const mockExpenses = [
    { title: "Coffee", cost: 5, dates: "2023-10-01", expense_id: 1 },
  
];
  cy.mount(
    <ExpensesContext.Provider value={{ expenses: mockExpenses, setExpenses: () => { } }}>
      <LoadingContext.Provider value={{ isLoading: false, setIsLoading: () => { } }}>
        <ExpenseList />
      </LoadingContext.Provider>
    </ExpensesContext.Provider>

  )
  //Stepper should have initial count of 0 (default)
  cy.get('[data-cy=expense-title]').should('have.text', 'Coffee')
  cy.get('[data-cy=expense-cost]').should('have.text', '€ 5')
  cy.get('[data-cy=expense-date]').should('have.text', '2023-10-01')

})

