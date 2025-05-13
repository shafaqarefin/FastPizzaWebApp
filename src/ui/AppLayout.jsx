import { Outlet, useNavigation, useRouteError } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Error from "./Error";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const error = useRouteError();
  return (
    <div>
      {isLoading && <Loader />}
      <Header />

      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
