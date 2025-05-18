import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="mb-4 grid grid-cols-[auto_1fr] gap-8 border-b-2 border-gray-400 p-4">
      <img src={imageUrl} alt={name} className="h-32 w-32" />
      <div className="grid grid-rows-[auto_auto_auto]">
        <p className="font-medium">{name}</p>
        <p class="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div class="flex flex-row items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          <Button>Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
