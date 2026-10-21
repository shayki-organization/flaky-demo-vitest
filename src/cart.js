export function total(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function applyDiscount(amount, pct) {
  return Math.round(amount * (100 - pct)) / 100;
}
