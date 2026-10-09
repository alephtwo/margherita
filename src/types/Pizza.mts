export class Pizza {
  readonly #id: ReturnType<typeof globalThis.crypto.randomUUID>;
  readonly size: number;
  readonly price: number;

  constructor(args: { size: number; price: number }) {
    this.#id = globalThis.crypto.randomUUID();
    this.size = args.size;
    this.price = args.price;
  }

  get id() {
    return this.#id;
  }

  /**
   * Calculate the price per unit area for the pizza.
   * @param pizza The pizza to calculate
   * @returns The price per area.
   */
  calculate() {
    const radius = this.size / 2;
    const area = Math.PI * Math.pow(radius, 2);
    return this.price / area;
  }
}
