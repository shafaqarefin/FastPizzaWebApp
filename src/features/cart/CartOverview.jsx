import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getCartQuanity } from './cartSlice';

function CartOverview() {
  const totalPizza = useSelector(getCartQuanity);
  const totalPrice = useSelector(getTotalCartPrice);
  if (totalPizza === 0) {
    return;
  }
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:p-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalPizza} pizzas</span>
        <span>&#x20AC;{totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
