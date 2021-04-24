import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTAL' });
  }, [state.cart]);

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const increaseItem = (id) => dispatch({ type: 'INCREASE_ITEM', payload: id });

  const decreaseItem = (id) => dispatch({ type: 'DECREASE_ITEM', payload: id });

  const modItem = (id, mode) =>
    dispatch({ type: 'MOD_ITEM', payload: { id, mode } });

  const fetchCartItems = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: 'SUCCESS', payload: cart });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchCartItems(), []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        modItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
