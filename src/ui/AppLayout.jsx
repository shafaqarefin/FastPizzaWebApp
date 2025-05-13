import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

function AppLayout() {
  return (
    <section>
      <Header />
      <main>
        <h1>Content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </section>
  );
}

export default AppLayout;
