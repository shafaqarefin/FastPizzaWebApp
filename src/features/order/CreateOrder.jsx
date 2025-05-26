import {
  Form,
  redirect,
  useActionData,
  useFetcher,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../../ui/EmptyCart';
import store from '../../store';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const cart = useSelector(getCart);
  const isSubmitting = useNavigation().state === 'submitting';
  const errorForm = useActionData();
  const {
    userName,
    status: addressStatus,
    address,
    error,
    position,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const [userAddress, setUserAddress] = useState(address || '');

  useEffect(() => {
    if (address) setUserAddress(address);
  }, [address]);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={userName}
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {errorForm?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errorForm.phone}{' '}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />

            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          {address === '' && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              type="small"
              customClass="absolute right-[3px] z-50 top-[3px] md:right-[5px] md:top-[5px]  "
              disabled={isLoadingAddress}
            >
              Get Position
            </Button>
          )}
        </div>

        <div className="mb-12 flex items-center justify-start gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 md:px-6 md:py-3"
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.longitude},${position.latitude}`
                : ''
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Ordering...'
              : `Order now for ${formatCurrency(withPriority ? totalCartPrice * 1.2 : totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please input a correct Phone Number';
  }
  if (Object.keys(errors).length > 0) return errors; //here we are returning errors object to router if any error

  const placedOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${placedOrder.id}`);
}

export default CreateOrder;
