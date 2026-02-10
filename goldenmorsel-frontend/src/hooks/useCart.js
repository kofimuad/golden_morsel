import { useStore, ACTIONS } from '../context/storeContext';
import { toast } from 'react-toastify';

export const useCart = () => {
  const { state, dispatch, cartTotals } = useStore();

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    const cartItem = {
      ...product,
      cartId: `${product._id}-${Date.now()}`,
      quantity,
      selectedVariant,
      addedAt: new Date().toISOString(),
    };

    dispatch({ type: ACTIONS.ADD_TO_CART, payload: cartItem });
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: cartId });
    toast.info('Item removed from cart', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const updateCartItem = (cartId, updates) => {
    dispatch({
      type: ACTIONS.UPDATE_CART_ITEM,
      payload: { cartId, updates },
    });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    toast.info('Cart cleared', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const getCartItem = (cartId) => {
    return state.cart.find(item => item.cartId === cartId);
  };

  const isInCart = (productId, variantId = null) => {
    return state.cart.some(item => {
      if (variantId) {
        return item._id === productId && item.selectedVariant?.id === variantId;
      }
      return item._id === productId;
    });
  };

  return {
    cart: state.cart,
    cartTotals,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartItem,
    isInCart,
  };
};

export default useCart;