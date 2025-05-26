import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from '../user/userSlice';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from '../../ui/EmptyCart';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUserName);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearCart());
  }
  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="px-4 py-3">
      <LinkButton to={'/menu'}>&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart,{username}</h2>
      <ul className="mt-3 divide-y divide-stone-800 border-b border-stone-200">
        {cart.map((cartItem) => (
          <CartItem item={cartItem} key={cartItem.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-8">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
