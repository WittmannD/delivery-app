import { useFormContext, Controller } from "react-hook-form";
import Map from "./Map/Map";
import { useSelector } from "react-redux";
import { useState } from "react";
import NumberFormat from "react-number-format";

import { getShoppingCart } from "../../redux/slices/cart.slice";
import { getShops } from "../../redux/slices/shop.slice";

const getDistanceLabel = (distance) => {
  return distance.distance ? (
    <div className="flex h-12 items-center justify-center space-x-4 font-semibold">
      <div className="flex flex-row flex-nowrap items-center">
        <svg
          className="mr-2 h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
        <span>{distance.distance}</span>
      </div>
      <div className="flex flex-row flex-nowrap items-center">
        <svg
          className="mr-2 h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{distance.duration}</span>
      </div>
    </div>
  ) : (
    <div className="h-12" />
  );
};

const OrderForm = () => {
  const cart = useSelector(getShoppingCart);
  const shops = useSelector(getShops);

  const currentShop = shops.find((shop) => shop.id === cart.shopId);
  const { setValue, formState, control, trigger } = useFormContext();

  const [distance, setDistance] = useState({});

  const setDestination = (address) => {
    setValue("address", address);
    trigger("address").then();
  };

  return currentShop ? (
    <div>
      <div className="h-80 overflow-hidden rounded-lg bg-gray-200">
        <Map
          origin={currentShop.shopDetails.geo}
          setDestination={setDestination}
          setDistance={setDistance}
          markerLabel={{
            text: currentShop.shopName,
            className: "font-semibold -translate-y-8",
          }}
        />
      </div>
      {getDistanceLabel(distance)}
      <form className="mt-4 sm:px-4">
        <div className="mb-4">
          <label
            htmlFor="address"
            className="float-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Address
          </label>
          {formState.errors.address && (
            <span className="float-right text-sm font-medium text-red-700 dark:text-red-400">
              {formState.errors.address.message}
            </span>
          )}
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <input
                type="text"
                id="address"
                className="clear-both block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...field}
                value={field.value || ""}
                readOnly
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="float-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          {formState.errors.email && (
            <span className="float-right text-sm font-medium text-red-700 dark:text-red-400">
              {formState.errors.email.message}
            </span>
          )}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="name@email.com"
                {...field}
                value={field.value || ""}
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tel"
            className="float-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Phone
          </label>
          {formState.errors.tel && (
            <span className="float-right text-sm font-medium text-red-700 dark:text-red-400">
              {formState.errors.tel.message}
            </span>
          )}
          <Controller
            control={control}
            name="tel"
            render={({ field }) => (
              <NumberFormat
                id="tel"
                type="tel"
                format="+### (##) ### ## ##"
                mask="_"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...field}
                value={field.value || ""}
                onValueChange={(v) => field.onChange(v.floatValue)}
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="float-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name
          </label>
          {formState.errors.name && (
            <span className="float-right text-sm font-medium text-red-700 dark:text-red-400">
              {formState.errors.name.message}
            </span>
          )}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <input
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...field}
                value={field.value || ""}
              />
            )}
          />
        </div>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default OrderForm;
