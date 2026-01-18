import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '@/components/dashboard/StatCard';

describe('StatCard', () => {
  it('renders the title and value', () => {
    render(
      <StatCard
        title="Total Applications"
        value={42}
        icon="📊"
        trend={{ value: 10, isPositive: true }}
      />
    );

    expect(screen.getByText('Total Applications')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(
      <StatCard
        title="Interviews"
        value={5}
        icon="📅"
      />
    );

    expect(screen.getByText('📅')).toBeInTheDocument();
  });

  it('renders positive trend correctly', () => {
    render(
      <StatCard
        title="Offers"
        value={3}
        icon="🎉"
        trend={{ value: 50, isPositive: true }}
      />
    );

    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  it('renders negative trend correctly', () => {
    render(
      <StatCard
        title="Rejections"
        value={2}
        icon="❌"
        trend={{ value: 20, isPositive: false }}
      />
    );

    expect(screen.getByText(/20%/)).toBeInTheDocument();
  });
});
