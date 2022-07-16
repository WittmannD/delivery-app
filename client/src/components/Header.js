import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart, setShoppingCart } from "../redux/slices/cart.slice";
import { price } from "../utils/helpers";
import { http } from "../utils/api";
import { useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector(getShoppingCart);

  const fetchCart = async () => {
    const response = await http.get(`/cart`).catch((err) => {
      console.log(err);
    });

    dispatch(setShoppingCart(response.data));
  };

  useEffect(() => {
    fetchCart().then();
  }, []);

  return (
    <header>
      <nav className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between space-y-2 px-4 sm:flex-row sm:space-y-0">
          <Link to="/" className="flex items-center">
            <span className="self-center whitespace-nowrap text-2xl font-semibold hover:text-gray-700 dark:text-white dark:hover:text-gray-200">
              Your Delivery
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {location.pathname === "/order" ? (
              <Link
                to={`/shop/${cart.shopId ?? ""}`}
                className="inline-flex shrink-0 items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
            ) : (
              <>
                <h3 className="mr-4 text-center text-base sm:mr-8 md:text-lg">
                  <span className="hidden md:inline">Total price: </span>
                  <span className="mx-2 font-semibold">
                    {price(cart.totalAmount)}
                  </span>
                </h3>
                <Link
                  to="/order"
                  className="inline-flex shrink-0 items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="mr-2 -ml-1 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Shopping Cart
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary-200 px-1 text-xs font-bold text-primary-800">
                    {cart.totalQuantity}
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
