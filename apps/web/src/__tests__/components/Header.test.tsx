import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

describe('Header', () => {
  it('renders the title', () => {
    render(<Header title="Dashboard" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(
      <Header
        title="Applications"
        subtitle="Manage your job applications"
      />
    );

    expect(screen.getByText('Applications')).toBeInTheDocument();
    expect(screen.getByText('Manage your job applications')).toBeInTheDocument();
  });

  it('renders action buttons when provided', () => {
    render(
      <Header
        title="Jobs"
        actions={
          <button>Add Job</button>
        }
      />
    );

    expect(screen.getByText('Add Job')).toBeInTheDocument();
  });
});
