import React from "react";
import { Outlet } from "react-router-dom";

export const SignInLayout: React.FC = () => {
  return (
    <div>
      <p>eu sou o layout de telas autenticadas</p>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
