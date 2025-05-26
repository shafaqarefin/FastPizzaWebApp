import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { decreaseItem, increaseItem } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between gap-2 md:gap-4">
      <Button
        type="round"
        onClick={() => {
          dispatch(increaseItem(pizzaId));
        }}
      >
        +
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => {
          dispatch(decreaseItem(pizzaId));
        }}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
