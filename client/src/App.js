import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import HomeRoute from "./routes/home.route";
import ShopRoute from "./routes/shop.route";
import OrderRoute from "./routes/order.route";
import Placeholder from "./components/Placeholder";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { http } from "./utils/api";
import { setShops } from "./redux/slices/shop.slice";

function App() {
  const dispatch = useDispatch();

  const fetchShops = async () => {
    const response = await http.get("/shop/").catch((err) => {
      toast.error("something went wrong");
    });

    dispatch(setShops(response.data));
  };

  useEffect(() => {
    fetchShops().then();
  }, []);

  return (
    <div className="flex min-h-screen flex-col flex-nowrap bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-center" gutter={16} />
      <Header />
      <div className="flex-1 px-2 md:relative lg:px-6">
        <Routes>
          <Route exact index element={<Navigate to="/shop" replace />} />
          <Route path="shop" element={<HomeRoute />}>
            <Route index element={<Placeholder />} />
            <Route path=":shopId" element={<ShopRoute />} />
          </Route>
          <Route path="order" element={<OrderRoute />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
