import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer>
      footer
      </footer>
     
    </div>
  );
};

export default Layout;
