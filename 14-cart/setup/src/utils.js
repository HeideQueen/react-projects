const modCartItemAmount = (cart, payload) => {
  const newCart = cart
    .map((cartItem) => {
      if (cartItem.id === payload.id) {
        return payload.mode === 'increase'
          ? { ...cartItem, amount: cartItem.amount + 1 }
          : { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    })
    .filter((cartItem) => !cartItem.amount <= 0);

  return newCart;
};

export default modCartItemAmount;
