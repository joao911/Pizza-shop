import React from "react";
import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { Separator } from "../ui/separator";
import { ModeToggle } from "../Theme/ThemeTogle";
import { AccountMenu } from "../AccountMenu";

// import { Container } from './styles';

export const Header: React.FC = () => {
  return (
    <div className="flex border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
      </div>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/">
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            inicio
          </div>
        </NavLink>
        <NavLink to="/orders">
          <div className="flex items-center gap-1">
            <UtensilsCrossed className="h-4 w-4" />
            Home
          </div>
        </NavLink>
      </nav>
      <div className="ml-auto flex items-center gap-2 pr-3">
        <ModeToggle />
        <AccountMenu />
      </div>
    </div>
  );
};
