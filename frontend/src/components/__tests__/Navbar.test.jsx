import {render,screen, cleanup} from '@testing-library/react'
import Navbar from '../../layout/Navbar'

test('should render Navbar component', ()=> {
    render(<Navbar/>)
    const navHeading = screen.getByTestId('nav-heading');
    expect (navHeading).toBeInTheDocument();
    expect(navHeading).toHaveTextContent('Expenses');
})