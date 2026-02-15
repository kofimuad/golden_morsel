import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cart: [],
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Action types
export const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

// Reducer
const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const existingItem = state.cart.find(
        item => item._id === action.payload._id && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(action.payload.selectedVariant)
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id && 
            JSON.stringify(item.selectedVariant) === JSON.stringify(action.payload.selectedVariant)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.cartId !== action.payload),
      };

    case ACTIONS.UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };

    case ACTIONS.LOGOUT:
      localStorage.removeItem('authToken');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Create context
const StoreContext = createContext();

// Provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState, (initial) => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    return {
      ...initial,
      cart: savedCart ? JSON.parse(savedCart) : [],
    };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Calculate cart totals
  const cartTotals = {
    itemCount: state.cart.reduce((total, item) => total + item.quantity, 0),
    subtotal: state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, cartTotals }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export default StoreProvider;