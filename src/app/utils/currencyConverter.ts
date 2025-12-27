import { currencyRates } from '../data/mockData';

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Get the rates for both currencies
  const fromRate = currencyRates.find(c => c.code === fromCurrency);
  const toRate = currencyRates.find(c => c.code === toCurrency);

  if (!fromRate || !toRate) {
    return amount; // Return original amount if currency not found
  }

  // Convert from any currency to USD first, then to target currency
  const amountInUSD = amount / fromRate.rate;
  const convertedAmount = amountInUSD * toRate.rate;

  return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currencyData = currencyRates.find(c => c.code === currencyCode);
  const symbol = currencyData?.flag || currencyCode;
  
  // Format the number with appropriate decimal places
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formatted} ${currencyCode}`;
}

export function getCurrencySymbol(currencyCode: string): string {
  const currencyData = currencyRates.find(c => c.code === currencyCode);
  return currencyData?.flag || currencyCode;
}
