export function formatCredit(amount) {
  const absAmount = Math.abs(amount);
  let formatted = '';

  if (absAmount >= 10000000) {
    formatted = `${(absAmount / 10000000).toFixed(2)}C`; // Crores
  } else if (absAmount >= 100000) {
    formatted = `${(absAmount / 100000).toFixed(2)}L`; // Lakhs
  } else {
    formatted = `₹${absAmount.toLocaleString('en-IN')}`; // Indian number format
  }

  return amount < 0 ? `- ${formatted}` : formatted;
}


export function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
