import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { toast } from "sonner";
import {
  GetManagedRestaurant,
  getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/updateProfile";

interface IProfileDialogProps {
  setIsOpen(value: boolean): void;
}
export const ProfileDialog: React.FC<IProfileDialogProps> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const userSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatório").nullable(),
  });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateRestaurantCached({ name, description }: NewCycleFormData) {
    const cached = queryClient.getQueryData<GetManagedRestaurant>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurant>(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }
    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateRestaurantCached({ name, description });
      return { previousProfile: cached };
    },
    onError(_error, _variables, context) {
      if (context?.previousProfile) {
        updateRestaurantCached(context.previousProfile);
      }
    },
  });

  const onSubmit = async (data: NewCycleFormData) => {
    setIsOpen(false);
    const { name, description } = data;
    try {
      await updateProfileFn({ name, description });
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao atualizar perfil, tente novamente");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input {...register("name")} id="name" className="col-span-3" />
            <p className="col-span-4 text-center text-sm text-red-500">
              {errors.name?.message}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              {...register("description")}
              id="description"
              className="col-span-3"
            />
            <p className="col-span-4 text-center text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setIsOpen(false);
              reset();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
