import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { http } from "../../utils/api";
import { getProducts, setProducts } from "../../redux/slices/product.slice";
import { useParams } from "react-router-dom";
import Product from "./Product";
import toast from "react-hot-toast";

const Products = () => {
  const products = useSelector(getProducts);
  const dispatch = useDispatch();
  let { shopId } = useParams();

  const fetchProducts = async () => {
    const response = await http.get(`/shop/${shopId}/products`).catch((err) => {
      toast.error("something went wrong");
    });

    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts().then();
  }, [shopId]);

  return (
    <div className="grid flex-1 shrink grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-1 md:self-start lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
};

export default Products;
