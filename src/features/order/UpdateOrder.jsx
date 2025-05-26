import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useFetcher } from 'react-router-dom';

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <Button type="primary" customClass={' absolute right-[2px] '}>
        Make Priority
      </Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  console.log(params.orderId);
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
