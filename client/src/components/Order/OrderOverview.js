import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  clearShoppingCart,
  getShoppingCart,
  setShoppingCart,
} from "../../redux/slices/cart.slice";
import { price } from "../../utils/helpers";
import OrderItem from "./OrderItem";
import OrderForm from "./OrderForm";
import { http } from "../../utils/api";
import { useEffect } from "react";
import { orderFormSchema } from "../../utils/validation";

const OrderOverview = () => {
  const cart = useSelector(getShoppingCart);
  const dispatch = useDispatch();
  const orderFormStates = useForm({
    resolver: joiResolver(orderFormSchema),
  });

  const fetchCart = async () => {
    const response = await http.get(`/cart`).catch((err) => {
      toast.error("something went wrong");
    });

    dispatch(setShoppingCart(response.data));
  };

  const submitOrder = (data) => {
    toast
      .promise(
        http.post("/order", data),
        {
          loading: "loading...",
          success: "Order successfully created!",
          error: "Something went wrong",
        },
        {
          duration: 6000,
        }
      )
      .then((response) => dispatch(clearShoppingCart()))
      .catch((err) => {});
  };

  useEffect(() => {
    fetchCart().then();
  }, []);

  return (
    <div className="absolute inset-0">
      {!Number(cart.totalAmount) ? (
        <div className="mx-auto flex h-full max-w-screen-md items-center justify-center">
          <div className="pb-8 text-center text-2xl font-semibold">
            <p>Your shopping cart is empty now.</p>
            <p>Go to the store page and select a product</p>
            <Link
              to={"/shop"}
              className="mt-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                className="mr-2 -ml-1 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex h-full max-w-screen-xl space-x-4 p-4">
          <div className="flex-1">
            <FormProvider {...orderFormStates}>
              <OrderForm />
            </FormProvider>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="space-y-4 overflow-y-auto rounded-lg border p-4">
              {cart.items.map((product) => (
                <OrderItem data={product} key={product.id} />
              ))}
            </div>
            <div className="mt-4 mb-9 flex flex-row items-center justify-between p-4">
              <h3 className="text-xl">
                Total price:{" "}
                <span className="mx-2 font-semibold">
                  {price(cart.totalAmount)}
                </span>
              </h3>
              <button
                onClick={orderFormStates.handleSubmit(submitOrder)}
                className="mr-2 inline-flex items-center rounded-lg bg-primary-700 px-6 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-2 -ml-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Create order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderOverview;
