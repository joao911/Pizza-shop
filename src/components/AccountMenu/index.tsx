import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getManagerRestaurant, getProfile } from "./useAccountMenu";
import { Skeleton } from "../ui/skeleton";

export const AccountMenu: React.FC = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: managedRestaurant, isLoading: isLoadingManaged } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagerRestaurant,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {isLoadingManaged ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            managedRestaurant?.name
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>
            {isLoadingProfile ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.name
            )}
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {isLoadingProfile ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.email
            )}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="mr-2 h-4 w-4" /> <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOut className="mr-2 h-4 w-4" /> <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
