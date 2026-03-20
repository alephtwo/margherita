const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCurrency(money: number) {
  return currencyFormatter.format(money);
}
