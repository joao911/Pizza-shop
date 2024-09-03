import React, { useState } from "react";
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

import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ProfileDialog } from "../ProfileDialog";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/getProfile";

export const AccountMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { data: managedRestaurant, isLoading: isLoadingManaged } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" /> <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="mr-2 h-4 w-4" /> <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileDialog setIsOpen={setIsOpen} />
    </Dialog>
  );
};
