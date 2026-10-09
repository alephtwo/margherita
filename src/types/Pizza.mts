import { immerable } from "immer";

export class Pizza {
  [immerable] = true;
  readonly id: ReturnType<typeof globalThis.crypto.randomUUID>;
  size: number | "";
  price: number | "";

  constructor(args: { size: number | ""; price: number | "" }) {
    this.id = globalThis.crypto.randomUUID();
    this.size = args.size;
    this.price = args.price;
  }

  static defaultPizza() {
    return new Pizza({ size: 12, price: "" });
  }

  /**
   * Calculate the price per unit area for the pizza.
   * @param pizza The pizza to calculate
   * @returns The price per area.
   */
  calculateEfficiency(): number | undefined {
    // If the price or size is unknown, treat it as incalculable.
    if (this.size === "" || this.price === "") {
      return undefined;
    }

    const radius = this.size / 2;
    const area = Math.PI * Math.pow(radius, 2);
    return area / this.price;
  }
}
