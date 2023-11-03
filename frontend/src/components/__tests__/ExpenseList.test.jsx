import {render,screen, cleanup} from '@testing-library/react'
import ExpenseList from '../../components/ExpenseList'

test('should render expenseList component', ()=> {
    render(<ExpenseList/>)
    const expenseHeading = screen.getByTestId('expense-heading');
    expect (expenseHeading).toBeInTheDocument();
    expect(expenseHeading).toHaveTextContent('Expenses');
})