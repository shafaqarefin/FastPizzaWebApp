import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    if (!id) return;
    dispatch(deleteItem(id));
  }

  return (
    <Button type="small" onClick={() => handleDelete(pizzaId)}>
      Delete
    </Button>
  );
}

export default DeleteItem;
