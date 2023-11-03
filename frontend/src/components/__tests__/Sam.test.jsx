import {render,screen, cleanup} from '@testing-library/react'
import Sam from '../../components/Sam'

test('should rendersam component', ()=> {
    render(<Sam/>)
    const samHeading = screen.getByTestId('123');
    expect (samHeading).toBeInTheDocument();
    expect(samHeading).toHaveTextContent('abc');
})