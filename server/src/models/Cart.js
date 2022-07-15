const _ = require("lodash");

class Cart {
  constructor(items, shopId) {
    this.items = items || {};
    this.shopId = shopId ?? null;
  }

  get totalAmount() {
    return _.sumBy(Object.values(this.items), (o) => o.cartItemTotalPrice);
  }

  get totalQuantity() {
    return _.sumBy(Object.values(this.items), (o) => o.cartItemQuantity);
  }

  get itemsList() {
    return Object.entries(this.items).map(([id, values]) => ({
      id,
      ...values,
    }));
  }

  static create({ items, shopId }) {
    let itemsObject = items;
    if (_.isArray(itemsObject))
      itemsObject = _.keyBy(itemsObject, (o) => o.id || o.product.id);

    return new Cart(itemsObject, shopId);
  }

  add(product) {
    const item = this.items[product.id] || {};

    item.product = product;
    item.cartItemUnitPrice = item.cartItemUnitPrice || product.productUnitPrice;
    item.cartItemQuantity = (item.cartItemQuantity || 0) + 1;
    item.cartItemTotalPrice = item.cartItemUnitPrice * item.cartItemQuantity;

    this.items[product.id] = item;
    this.shopId = item.product.shopId ?? null;
  }

  remove(productId) {
    const item = this.items[productId];

    if (item) {
      if (item.cartItemQuantity <= 1) {
        return this.delete(productId);
      }

      item.cartItemQuantity -= 1;
      item.cartItemTotalPrice = item.cartItemUnitPrice * item.cartItemQuantity;

      this.items[productId] = item;
    }
  }

  delete(productId) {
    const item = this.items[productId];
    if (item) delete this.items[productId];
    if (this.totalQuantity === 0) this.shopId = null;
  }

  toObject() {
    return {
      totalAmount: this.totalAmount,
      totalQuantity: this.totalQuantity,
      items: this.itemsList,
      shopId: this.shopId,
    };
  }

  static toObject(cart) {
    return {
      totalAmount: cart.totalAmount,
      totalQuantity: cart.totalQuantity,
      items: cart.itemsList,
      shopId: cart.shopId,
    };
  }

  static empty() {
    return Cart.create({})
  }
}

module.exports = Cart;
