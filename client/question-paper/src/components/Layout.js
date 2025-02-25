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
      <main className="flex-grow p-6 overflow-auto">
        <Outlet />
      </main>
  
      {/* Footer (always at the bottom) */}
      <footer className="bg-gray-800 text-white p-4">
        <Footer />
      </footer>
    </div>
  );
  
};

export default Layout;
