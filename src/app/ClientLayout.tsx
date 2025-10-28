import AOSInit from "@/components/AOSInit";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div>
      <AOSInit />
      <Navbar />
      <main className={`relative z-10 pt-20`}>{children}</main>
    </div>
  );
};

export default ClientLayout;
