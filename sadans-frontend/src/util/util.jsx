export function formatCredit(amount) {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}C`; // For millions, show one decimal
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(1)}L`; // For lakhs, show one decimal
  }
  return `₹${amount}`; // For amounts less than 100,000
}
