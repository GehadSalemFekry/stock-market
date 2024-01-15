import React, { ReactNode } from "react";
import { NextAuthProvider } from "@/context/AuthContext";
import { StocksProvider } from "@/context/StocksContext";
import { WebSocketProvider } from "@/context/WebSocketContext";

interface ContextProvidersProps {
  children: ReactNode;
}

const ContextProviders: React.FC<ContextProvidersProps> = ({ children }) => {
  return (
    <WebSocketProvider>
      <NextAuthProvider>
        <StocksProvider>{children}</StocksProvider>
      </NextAuthProvider>
    </WebSocketProvider>
  );
};

export default ContextProviders;
