import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearShoppingCart, getShoppingCart } from "../redux/slices/cart.slice";
import { getShops } from "../redux/slices/shop.slice";
import { http } from "../utils/api";
import { useState } from "react";

const Shops = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getShoppingCart);
  const [asideOpened, setAsideOpened] = useState(false);
  const navigate = useNavigate();
  const shops = useSelector(getShops);
  const emmitError = () => {
    toast(
      (t) => (
        <div>
          <p>you can only order from one store at a time</p>
          <button
            onClick={() => {
              toast
                .promise(http.post("/cart/reset"), {
                  loading: "loading...",
                  success: "shopping cart was reset",
                  error: "something went wrong",
                })
                .then((response) => dispatch(clearShoppingCart()))
                .catch((err) => {});
            }}
            className="mt-2 w-full rounded-lg bg-red-500 px-2 py-1.5 text-white"
          >
            Reset cart
          </button>
        </div>
      ),
      {
        id: "only one store at a time",
      }
    );
  };

  const toShop = (id) => {
    setAsideOpened(false);
    navigate(`/shop/${id}`, { replace: true });
  };

  return (
    <>
      <aside
        className={`fixed inset-0 ${
          asideOpened ? "flex" : "hidden"
        } max-h-screen w-full self-start bg-gray-900/70 p-8 md:sticky md:inset-x-auto md:inset-y-0 md:flex md:w-80 md:shrink-0 md:bg-transparent md:px-0 md:py-4`}
        aria-label="Sidebar"
      >
        <div className="flex-1 space-y-4 overflow-y-auto rounded-md bg-white p-4 dark:bg-gray-800">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className={`relative h-24 overflow-hidden rounded-lg ${
                cart.shopId !== null && cart.shopId === shop.id
                  ? "ring-4 ring-gray-400"
                  : ""
              }`}
            >
              <img
                src={shop.shopImage}
                alt={`shop_${shop.id}`}
                className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2"
              />
              {cart.shopId !== null && cart.shopId !== shop.id ? (
                <div
                  onClick={emmitError}
                  className="absolute inset-0 flex cursor-default items-center justify-center bg-gray-900 p-4 text-xl font-semibold text-gray-500"
                >
                  {shop.shopName}
                </div>
              ) : (
                <button
                  role="link"
                  onClick={() => toShop(shop.id)}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900/70 p-4 text-xl font-semibold text-white"
                >
                  {shop.shopName}
                </button>
              )}
            </div>
          ))}
        </div>
      </aside>
      <button
        onClick={() => setAsideOpened((prevState) => !prevState)}
        className={`fixed bottom-5 left-5 flex h-20 w-20 items-center justify-center rounded-full bg-white ${
          !asideOpened
            ? "text-black ring-gray-700/50"
            : "text-primary-800 ring-primary-700/50"
        } ring-4 md:hidden`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
};

export default Shops;
