// Shared combinatorics and formatting utilities

// Binomial coefficient C(n, k) — numerically stable iterative approach
export function binomial(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return Math.round(result);
}

// Factorial with memoization
const factorialCache: Record<number, number> = {};
export function factorial(n: number): number {
  if (n <= 1) return 1;
  if (factorialCache[n]) return factorialCache[n];
  factorialCache[n] = n * factorial(n - 1);
  return factorialCache[n];
}

// Format currency in Italian locale
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
}

// Format number in Italian locale
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('it-IT').format(n);
}
