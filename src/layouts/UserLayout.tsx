import React from "react";
import Navbar from "../components/mainUser/Navbar";
import Footer from "../components/mainUser/Footer";
import ScrollToTop from "../components/ScrollToTop";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />

      {/* Nội dung chính */}
      <main className="flex-1 pt-16">{children}</main>

      <Footer />
    </div>
  );
};
  
export default UserLayout;
