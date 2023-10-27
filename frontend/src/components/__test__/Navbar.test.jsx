import {render,screen} from '@testing-library/react'
import Navbar from '../Navbar'

test('renders nav bar link', () => {
    render(<Navbar/>);
    const linkElement = screen.getByText(/navbar12/i)
    expect(linkElement).toBeInTheDocument()
})


test('renders 6 list items', () => {
    render(<Navbar/>);
    const listItems = screen.getAllByRole("listitem")
    expect(listItems).toHaveLength(6)
})

test('renders title', () => {
    render(<Navbar/>);
    const title = screen.getByTestId("mytestid")
    expect(title).toBeInTheDocument()
})
test('sum should be 6', () => {
    render(<Navbar/>);
    const sum = screen.getByTitle("sum")
    expect(sum.textContent).toBe("6")
})
