import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <header>
        <Header />
      </header>
  
      {/* Main Content (grows to fill space) */}
      <main className="relative flex-grow p-6">
        <Outlet />
      </main>
  
      {/* Footer (always at the bottom) */}
      <footer className="bg-teal-900 text-white p-4 text-2xl">
        <Footer />
      </footer>
    </div>
  );
  
};

export default Layout;
