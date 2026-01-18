import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);

    // Check for main content
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(<Home />);

    // Check for JobPulse branding
    expect(screen.getByText(/JobPulse/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Home />);

    // Check for navigation links
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
