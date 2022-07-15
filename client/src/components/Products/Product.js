import PropTypes from "prop-types";
import { http } from "../../utils/api";
import { setShoppingCart } from "../../redux/slices/cart.slice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { price } from "../../utils/helpers";

const Product = ({ data }) => {
  const dispatch = useDispatch();

  const addToCart = async (productId) => {
    toast
      .promise(http.post(`/cart/${productId}/add`), {
        loading: "loading...",
        success: "added to your cart",
        error: "something went wrong",
      })
      .then((response) => dispatch(setShoppingCart(response.data)))
      .catch((err) => {});
  };

  return (
    <figure
      className="min-h-[200px] rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
      key={data.id}
    >
      <div>
        <img
          className="h-48 w-full rounded-t-lg object-cover"
          src={data.productImage}
          alt={`product_${data.id}`}
        />
      </div>
      <figcaption className="p-4">
        <h2
          className="mb-3 overflow-hidden text-xl font-medium text-gray-900 dark:text-gray-100"
          style={{
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            height: "60px",
          }}
        >
          {data.productName}
        </h2>
        <button
          onClick={() => addToCart(data.id)}
          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-center text-sm text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {price(data.productUnitPrice)}
        </button>
      </figcaption>
    </figure>
  );
};

Product.propTypes = {
  data: PropTypes.object,
};

export default Product;
