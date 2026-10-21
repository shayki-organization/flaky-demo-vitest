import { describe, it, expect } from 'vitest';
import { total, applyDiscount } from './cart.js';

describe('cart', () => {
  it('sums item prices', () => {
    expect(total([{ price: 10, qty: 2 }])).toBe(20);
  });

  it('returns zero for an empty cart', () => {
    expect(total([])).toBe(0);
  });

  it('applies a percentage discount', () => {
    expect(applyDiscount(200, 10)).toBe(180);
  });

  it('handles fractional quantities', () => {
    expect(total([{ price: 3, qty: 0.5 }])).toBe(1.5);
  });
});

describe('cart flaky', () => {
  it('flaky: totals cart under load', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated timeout while totalling cart');
    }
    expect(total([{ price: 5, qty: 4 }])).toBe(20);
  });

  it('flaky: applies discount under contention', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated stale discount cache');
    }
    expect(applyDiscount(100, 25)).toBe(75);
  });

  it('flaky: fails on first attempt only', () => {
    if (process.env.GITHUB_RUN_ATTEMPT === '1') {
      throw new Error('flaky: simulated first-attempt failure (GITHUB_RUN_ATTEMPT=1)');
    }
    expect(total([{ price: 5, qty: 4 }])).toBe(20);
  });

  it('flaky: handles empty cart under race', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated race reading cart');
    }
    expect(total([])).toBe(0);
  });
});
