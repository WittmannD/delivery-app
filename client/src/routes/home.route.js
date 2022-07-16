import { Outlet } from "react-router-dom";

import Shops from "../components/Shops";

const HomeRoute = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col md:flex-row">
      <Shops />
      <Outlet />
    </div>
  );
};

export default HomeRoute;
