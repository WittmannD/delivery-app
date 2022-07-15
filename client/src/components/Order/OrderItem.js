import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "../../redux/slices/cart.slice";
import { http } from "../../utils/api";
import { data } from "autoprefixer";
import {price} from "../../utils/helpers";

const OrderItem = ({ data }) => {
  const dispatch = useDispatch();

  const remove = async () => {
    const response = await http.post(`/cart/${data.id}/remove`).catch((err) => {
      console.log(err);
    });

    dispatch(setShoppingCart(response.data));
  };

  const add = async () => {
    const response = await http.post(`/cart/${data.id}/add`).catch((err) => {
      console.log(err);
    });

    dispatch(setShoppingCart(response.data));
  };

  return (
    <div className="flex flex-col items-center rounded-lg border bg-white dark:border-gray-700 dark:bg-gray-800 md:max-w-xl lg:flex-row">
      <img
        className="h-36 w-full shrink-0 rounded-t-lg object-cover lg:h-48 lg:w-48 lg:rounded-none lg:rounded-l-lg"
        src={data.product.productImage}
        alt=""
      />
      <div className="flex flex-1 flex-col items-center justify-between p-4 leading-normal">
        <h4 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.product.productName}
        </h4>
        <p className="mb-2 text-gray-700 dark:text-gray-200">
          Price:{" "}
          <span className="font-semibold">
            {price(data.cartItemTotalPrice)}
          </span>
        </p>
        <div>
          <div className="inline-block rounded-lg bg-gray-200 text-lg">
            <button
              className="inline-block h-14 w-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-800"
              onClick={() => remove()}
            >
              -
            </button>
            <span className="px-4">{data.cartItemQuantity}</span>
            <button
              className="inline-block h-14 w-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-800"
              onClick={() => add()}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  data: PropTypes.object,
};

export default OrderItem;
