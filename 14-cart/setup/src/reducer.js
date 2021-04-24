import modCartItemAmount from './utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== payload),
      };
    case 'MOD_ITEM':
      return { ...state, cart: modCartItemAmount(state.cart, payload) };
    case 'UPDATE_TOTAL':
      const { amount, total } = state.cart.reduce(
        (acc, cartItem) => {
          const priceTotal = acc.total + cartItem.amount * cartItem.price;
          const cartTotal = acc.amount + cartItem.amount;

          return {
            total: priceTotal,
            amount: cartTotal,
          };
        },
        { total: 0, amount: 0 }
      );

      return {
        ...state,
        amount,
        total,
      };
    case 'LOADING':
      return { ...state, loading: true };
    case 'SUCCESS':
      return { ...state, cart: payload, loading: false };
    default:
      return state;
  }
};

export default reducer;
