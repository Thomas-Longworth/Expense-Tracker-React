import { render, screen } from '@testing-library/react';

import Footer from '../Footer';
it("has the word hello", () => {
    render(<Footer />);
    const linkElement = screen.getByText(/hello/);
  
    // Assert that the linkElement is in the Footer component
    expect(linkElement).toBeInTheDocument();
})