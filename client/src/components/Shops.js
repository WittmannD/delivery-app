import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { clearShoppingCart, getShoppingCart } from "../redux/slices/cart.slice";
import { getShops } from "../redux/slices/shop.slice";
import { http } from "../utils/api";

const Shops = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getShoppingCart);
  const shops = useSelector(getShops);
  const emmitError = () => {
    toast((t) => (
      <div>
        <p>You can only order from one store at a time</p>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            toast
              .promise(http.post("/cart/reset"), {
                loading: "loading...",
                success: "Shopping cart was reset",
                error: "Something went wrong",
              })
              .then((response) => dispatch(clearShoppingCart()))
              .catch((err) => {});
          }}
          className="mt-2 w-full rounded-lg bg-red-500 px-2 py-1.5 text-white"
        >
          Reset cart
        </button>
      </div>
    ));
  };

  return (
    <aside className="my-4 w-80 shrink-0" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto rounded-md bg-white p-4 dark:bg-gray-800">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="relative h-24 overflow-hidden rounded-lg "
          >
            <img
              src={shop.shopImage}
              alt={`shop_${shop.id}`}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            />
            {cart.shopId !== null && cart.shopId !== shop.id ? (
              <div
                onClick={emmitError}
                className="absolute inset-0 flex cursor-default items-center justify-center bg-gray-900/70 p-4 text-xl font-semibold text-gray-500"
              >
                {shop.shopName}
              </div>
            ) : (
              <Link
                to={`/shop/${shop.id}`}
                className="absolute inset-0 flex items-center justify-center bg-gray-900/70 p-4 text-xl font-semibold text-white"
              >
                {shop.shopName}
              </Link>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Shops;
